# Use official Node.js 18 image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the server
CMD ["node", "server.js"]
