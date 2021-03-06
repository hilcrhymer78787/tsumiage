<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class tasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks')->insert([
            [
                'task_user_id' => 1,
                'task_name' => '読書',
                'task_status' => 1,
                'task_default_minute' => 15,
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'ITの勉強',
                'task_status' => 1,
                'task_default_minute' => 30,
            ],
            [
                'task_user_id' => 1,
                'task_name' => '筋トレ',
                'task_status' => 1,
                'task_default_minute' => 15,
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'ストレッチ',
                'task_status' => 1,
                'task_default_minute' => 20,
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'その他',
                'task_status' => 1,
                'task_default_minute' => 20,
            ],
            [
                'task_user_id' => 2,
                'task_name' => '掃除',
                'task_status' => 1,
                'task_default_minute' => 20,
            ],
            [
                'task_user_id' => 3,
                'task_name' => '洗濯',
                'task_status' => 1,
                'task_default_minute' => 5,
            ],
            [
                'task_user_id' => 3,
                'task_name' => '料理',
                'task_status' => 1,
                'task_default_minute' => 30,
            ],
            [
                'task_user_id' => 3,
                'task_name' => '買い出し',
                'task_status' => 1,
                'task_default_minute' => 30,
            ],
        ]);
    }
}
