# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
