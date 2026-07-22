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

FROM deps AS build
RUN pnpm --filter web build \
    && pnpm --filter server build \
    && pnpm deploy --filter=server --prod --legacy /prod/server

FROM node:${NODE_VERSION} AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    WEB_ROOT=/app/public \
    MIGRATIONS_PATH=/app/migrations
WORKDIR /app

COPY --from=build /prod/server/node_modules ./node_modules
COPY --from=build /app/apps/server/dist ./dist
COPY --from=build /app/apps/web/dist ./public
COPY --from=build /app/packages/db/src/migrations ./migrations

RUN addgroup -S coi && adduser -S coi -G coi && chown -R coi:coi /app
USER coi

EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/server.mjs"]
