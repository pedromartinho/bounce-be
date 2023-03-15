# Base image
FROM node:18.15-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=development

# Expose port 3000
EXPOSE 3050

# Start the application
CMD ["npm", "start"]