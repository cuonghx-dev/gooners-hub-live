#!/bin/bash
# Generates server/.env from environment variables.
# Expects vars to already be exported by the calling script.
set -euo pipefail

OUTPUT="server/.env"

cat > "$OUTPUT" <<EOF
DATABASE_URL=postgres://postgres:${POSTGRES_PASSWORD}@postgres:5432/xoixeo
JWT_SECRET=${JWT_SECRET}
MEDIAMTX_IP_ADDRESS=${MEDIAMTX_IP_ADDRESS}
MEDIAMTX_USER=${MEDIAMTX_PUBLISH_USER}
MEDIAMTX_PASS=${MEDIAMTX_PUBLISH_PASS}
MEDIAMTX_PUBLISH_PATH=${MEDIAMTX_PUBLISH_PATH}
PORT=4173
EOF

echo "Generated $OUTPUT"
