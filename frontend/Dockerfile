# Use a newer Node.js version
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into /app
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
