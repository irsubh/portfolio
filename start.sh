#!/bin/bash
set -e

echo "🚀 Starting subhm Next.js container (Live SFTP Sync Hot-Reload enabled)..."
docker compose down || true
docker compose up -d

echo "✅ Container started successfully on http://127.0.0.1:3000!"
echo "📡 Any file you edit and sync via SFTP will update instantly in the browser without restarting."
