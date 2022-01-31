FROM php:7.3-fpm

RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/bin/composer

RUN apt-get update \
&& apt-get install -y \
git \
zip \
unzip \
# nodejs \
vim

RUN apt-get update \
   && apt-get install -y libpq-dev \
   && docker-php-ext-install pdo_mysql pdo_pgsql
   
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

WORKDIR /var/www/html/laravel