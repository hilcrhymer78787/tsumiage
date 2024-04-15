<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Task;

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
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'ITの勉強',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 1,
                'task_name' => '筋トレ',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'ストレッチ',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 1,
                'task_name' => 'その他',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 2,
                'task_name' => '掃除',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 3,
                'task_name' => '洗濯',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 3,
                'task_name' => '料理',
                'created_at' => '2024-04-10 06:08:20'
            ],
            [
                'task_user_id' => 3,
                'task_name' => '買い出し',
                'created_at' => '2024-04-10 06:08:20'
            ],
        ]);
    }
}
