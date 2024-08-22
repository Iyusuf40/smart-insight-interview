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

# create autobots table
sudo mysql -u root -D 'tweetAi' -e "CREATE TABLE IF NOT EXISTS autobots (  \
  id INT PRIMARY KEY AUTO_INCREMENT,    \
  name VARCHAR(255) NOT NULL,   \
  username VARCHAR(255) NOT NULL,   \
  email VARCHAR(255) NOT NULL   \
);"

# create posts table 
sudo mysql -u root -D 'tweetAi' -e "CREATE TABLE posts ( \
  id INT PRIMARY KEY AUTO_INCREMENT, \
  title VARCHAR(255) NOT NULL, \
  body TEXT NOT NULL, \
  autobotId INT NOT NULL, \
  FOREIGN KEY (autobotId) REFERENCES autobots(id) \
  ON DELETE CASCADE \
);"

# create comments table

sudo mysql -u root -D 'tweetAi' -e "CREATE TABLE comments ( \
  id INT PRIMARY KEY AUTO_INCREMENT, \
  name VARCHAR(255) NOT NULL, \
  email VARCHAR(255) NOT NULL, \
  body TEXT NOT NULL, \
  postId INT NOT NULL, \
  FOREIGN KEY (postId) REFERENCES posts(id) \
  ON DELETE CASCADE \
);"