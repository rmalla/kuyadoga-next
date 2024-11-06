#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]
then
  echo "Error: No commit message provided."
  echo "Usage: ./git_commit.sh \"Your commit message\""
  exit 1
fi

# Navigate to the scripts directory
cd /var/www/kuyadoga-next/

# Add all changes
git add .

# Check if there are changes to commit
if ! git diff-index --quiet HEAD; then
    # Commit the changes with a message
    git commit -m "$1"

    # Push the changes to the remote repository
    git push origin main

    # Confirm success
echo "Changes have been committed and pushed. "
fi