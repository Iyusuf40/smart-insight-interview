#!/bin/bash

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