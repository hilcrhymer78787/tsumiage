<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('users')->insert([
                'id'       => $i,
                'name'     => "user${i}",
                'email'    => "user${i}@gmail.com",
                'password' => Hash::make('password'),
                'user_img' => "https://picsum.photos/500/300?image=${i}",
                'token'    => "user${i}@gmail.com" . Str::random(100),
            ]);
        }
    }
}
