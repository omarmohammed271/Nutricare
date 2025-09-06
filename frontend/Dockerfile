# Step 1: Build the app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.* ./
COPY . .

# Install dependencies
RUN npm install

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=${VITE_APP_API_URL}


# Build the app
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf


# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]