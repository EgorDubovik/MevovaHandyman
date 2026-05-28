#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
SSH_KEY="./.ssh/id__handyman"
SSH_USER="mevova-deploy"
SSH_HOST="15.204.254.56"
SSH_PORT="22"
# Default remote directory. Change this to the path where the project resides on the server.
REMOTE_DIR="/var/www/mevova"

echo "========================================="
echo "🚀 Starting Deployment Process"
echo "========================================="

# 1. Check TypeScript types
echo "🔍 Step 1: Checking TypeScript types..."
npx tsc --noEmit
echo "✅ Type check passed!"

# 2. Stage, commit and push changes
echo "📦 Step 2: Committing and pushing changes..."
# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "Uncommitted changes found. Staging all files..."
    git add -A
    
    # Use generic timestamped commit message for auto-deploys
    COMMIT_MSG="Auto-deploy commit: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "Committing with message: '$COMMIT_MSG'"
    git commit -m "$COMMIT_MSG"
else
    echo "No uncommitted changes found. Skipping commit."
fi

# Push to the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Pushing changes to remote branch '$CURRENT_BRANCH'..."
git push origin "$CURRENT_BRANCH"
echo "✅ Git push completed!"

# 3. Connect via SSH and pull on the server
echo "🖥️ Step 3: Deploying on remote server ($SSH_HOST)..."
if [ ! -f "$SSH_KEY" ]; then
    echo "❌ Error: SSH key not found at $SSH_KEY"
    exit 1
fi

# Ensure permissions of the key are correct (required for SSH on Unix/Git Bash)
chmod 600 "$SSH_KEY" 2>/dev/null || true

# Execute pull command on the server
# -o StrictHostKeyChecking=accept-new automatically adds the host key to known_hosts on first run
ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=accept-new "$SSH_USER@$SSH_HOST" "
    echo 'Connected to server.' && \
    if [ -d \"$REMOTE_DIR\" ]; then \
        cd \"$REMOTE_DIR\" && \
        echo 'Pulling latest changes in '\$(pwd) && \
        git pull origin \"$CURRENT_BRANCH\" && \
        echo '✅ Remote git pull successful!' && \
        
        echo 'Docker: Rebuilding and restarting containers...' && \
        docker compose up -d --build && \
        echo 'Docker: Pruning unused images...' && \
        docker image prune -f && \
        echo '✅ Remote deployment via Docker successful!';
    else \
        echo '❌ Error: Remote directory $REMOTE_DIR does not exist. Please update REMOTE_DIR in deploy.sh.'; \
        exit 1; \
    fi
"

echo "========================================="
echo "🎉 Deployment successfully completed!"
echo "========================================="
