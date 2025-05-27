FROM php:8.2-fpm

# Composer インストール（最新の方式に更新）
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    vim \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql

# 作業ディレクトリを設定
WORKDIR /var/www/html/laravel
