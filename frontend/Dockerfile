# Stage 1: Build frontend
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json from d/ directory
COPY d/package*.json ./
RUN npm install

# Copy all files from d/ directory
COPY d/ ./

# Build with Vite
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
