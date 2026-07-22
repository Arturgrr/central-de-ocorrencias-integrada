#!/bin/sh
set -eu

CONFIG_FILE=/usr/share/nginx/html/config.js
API_URL="${VITE_SERVER_URL:-http://localhost:3000}"

cat > "$CONFIG_FILE" <<EOF
window.__COI_CONFIG__ = {
  VITE_SERVER_URL: "${API_URL}"
};
EOF

echo "[coi] frontend apontando para a API em ${API_URL}"
