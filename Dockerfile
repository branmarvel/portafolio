FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose dev port
EXPOSE 4321

# Start the Astro development server
CMD ["npm", "run", "dev", "--", "--host"]
