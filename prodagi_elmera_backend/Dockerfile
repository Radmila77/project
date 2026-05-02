FROM php:8.4-fpm

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl

# Устанавливаем расширения PHP для работы с БД и графикой
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd intl zip

# Ставим Composer внутри контейнера
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
