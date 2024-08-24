#!/bin/bash

service redis-server start
service mysql start

# Set the database name, username, and password
DB_NAME="tweetAi"
USERNAME="tweetAiAdmin"
PASSWORD="tweetAiPassword"

# Create the database
sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Create the user and grant privileges
sudo mysql -u root -e "CREATE USER IF NOT EXISTS '$USERNAME'@'%' IDENTIFIED BY '$PASSWORD';"
sudo mysql -u root -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$USERNAME'@'%';"

# Flush privileges to apply the changes
sudo mysql -u root -e "FLUSH PRIVILEGES;"

# start api
node api/server.js &

CURRENT_DIR=$(pwd)

cd frontend
npm install
npm run build

cd ..

cd frontend
npx serve -s dist -p 8081 &

cd "$CURRENT_DIR"

node run_job.js &