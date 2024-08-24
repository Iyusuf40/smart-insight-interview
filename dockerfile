# Use an official Node.js 19 image as the base
FROM ubuntu:20.04

# Install Git
RUN apt-get update && apt-get install -y git curl

# Set the working directory to /app
WORKDIR /app

# Clone the Git repository
RUN git clone https://github.com/Iyusuf40/smart-insight-interview .

# install node
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get install nodejs -y

# Install dependencies
RUN npm install

# Install Redis and MySQL
RUN apt-get update && apt-get install -y redis-server 

RUN DEBIAN_FRONTEND=noninteractive apt-get install mysql-server -y
# start redis
RUN service redis-server start

COPY startAppDocker.sh .

# Expose the ports
EXPOSE 3000 6379 3306 80 8081

# Run the command to start the development server
CMD ["./startAppDocker.sh"]