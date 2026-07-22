# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    CI=true
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build-server
RUN pnpm --filter server build \
    && pnpm deploy --filter=server --prod --legacy /prod/server

FROM deps AS build-web
ARG VITE_SERVER_URL=http://localhost:3000
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
RUN pnpm --filter web build

FROM node:${NODE_VERSION} AS server
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

COPY --from=build-server /prod/server/node_modules ./node_modules
COPY --from=build-server /app/apps/server/dist ./dist

RUN addgroup -S coi && adduser -S coi -G coi && chown -R coi:coi /app
USER coi

EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.mjs"]

FROM nginx:1.27-alpine AS web
ENV VITE_SERVER_URL=http://localhost:3000

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/web-entrypoint.sh /docker-entrypoint.d/40-coi-config.sh
COPY --from=build-web /app/apps/web/dist /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/40-coi-config.sh

EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

FROM deps AS migrate
ENV NODE_ENV=production
CMD ["pnpm", "--filter", "@eng-soft1/db", "db:push"]
