FROM node:18-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source files
COPY . .

EXPOSE 5001

CMD ["node", "server.js"]
