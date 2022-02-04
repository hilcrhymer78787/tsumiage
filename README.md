git clone https://github.com/hilcrhymer78787/tsumiage.git

cd tsumiage

docker-compose up -d --build

docker-compose exec app bash

cp .env.example .env

composer install

php artisan key:generate

php artisan migrate:refresh --seed

cd ../next

cp .env.example .env

npm install

npm run dev