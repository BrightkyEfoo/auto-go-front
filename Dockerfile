# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]