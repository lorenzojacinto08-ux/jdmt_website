FROM node:20-alpine AS build

WORKDIR /app

# Install PHP and dependencies
RUN apk add --no-cache php8 php8-fpm php8-ctype php8-curl php8-dom php8-fileinfo php8-gd php8-iconv php8-intl php8-json php8-mbstring php8-openssl php8-pdo php8-pdo_sqlite php8-session php8-simplexml php8-xml php8-xmlwriter php8-zip php8-zlib composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Copy package files and install/build npm dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Final stage
FROM node:20-alpine

WORKDIR /app

# Install PHP and runtime dependencies
RUN apk add --no-cache php8 php8-fpm php8-ctype php8-curl php8-dom php8-fileinfo php8-gd php8-iconv php8-intl php8-json php8-mbstring php8-openssl php8-pdo php8-pdo_sqlite php8-session php8-simplexml php8-xml php8-xmlwriter php8-zip php8-zlib composer

# Copy built assets and dependencies from build stage
COPY --from=build /app .

# Generate application key
RUN php artisan key:generate --ansi

# Set permissions
RUN chmod -R 755 storage bootstrap/cache

# Expose port
EXPOSE 80

# Start command
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
