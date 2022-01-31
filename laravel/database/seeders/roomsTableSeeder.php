<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class roomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table('rooms')->insert([
          [
            'room_id' => 1,
            'room_name' => 'user1の部屋',
            'room_token' => date('Y-m-d H:i:s').Str::random(100),
            'room_img' => 'https://picsum.photos/500/300?image=1',
          ],
          [
            'room_id' => 2,
            'room_name' => 'user2の部屋',
            'room_token' => date('Y-m-d H:i:s').Str::random(100),
            'room_img' => 'https://picsum.photos/500/300?image=2',
          ],
          [
            'room_id' => 3,
            'room_name' => 'user3の部屋',
            'room_token' => date('Y-m-d H:i:s').Str::random(100),
            'room_img' => 'https://picsum.photos/500/300?image=3',
          ],
          [
            'room_id' => 4,
            'room_name' => 'user4の部屋',
            'room_token' => date('Y-m-d H:i:s').Str::random(100),
            'room_img' => 'https://picsum.photos/500/300?image=4',
          ],
       ]);
    }
}
