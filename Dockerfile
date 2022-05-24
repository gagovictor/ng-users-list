# Build the application for production
# stage 1

FROM node:alpine AS users-list-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Serve the dist folder using nginx with the provided configuration
FROM nginx:alpine
COPY snippets/nginx.conf /etc/nginx/nginx.conf
COPY --from=users-list-build /app/dist/users-list /usr/share/nginx/html
EXPOSE 80
