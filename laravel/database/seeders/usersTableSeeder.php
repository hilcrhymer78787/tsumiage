<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class usersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                [
                    'id' => $i,
                    'name' => "user${i}",
                    'email' => "user${i}@gmail.com",
                    // TODO hash
                    'password' => 'password',
                    'user_img' => "https://picsum.photos/500/300?image=${i}",
                    'token' => "user${i}@gmail.com" . Str::random(100),
                ],
            ]);
        }
    }
}
