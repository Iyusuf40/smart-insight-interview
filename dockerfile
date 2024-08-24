# Use an official Node.js 19 image as the base
FROM ubuntu:18.04

# Install Git
RUN apt-get update && apt-get install -y git curl

# Set the working directory to /app
WORKDIR /app

# Clone the Git repository
RUN git clone https://github.com/Iyusuf40/smart-insight-interview .

RUN curl -sL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs
# Install dependencies
RUN npm install

# Install Redis and MySQL
RUN apt-get update && apt-get install -y redis-server 
RUN apt-get install mysql-server -y

# Expose the ports
EXPOSE 3000 6379 3306 80 8081

# Run the command to start the development server
CMD ["bash", "startApp.sh"]