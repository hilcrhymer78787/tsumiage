<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class worksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  \App\Models\Work::factory(100)->create();
        DB::table('works')->insert([
            // [
            //     'work_user_id' => 1,
            //     'work_task_id' => 1,
            //     'work_date' => date('Y-m-d'),
            //     'work_minute' => 5,
            // ],
            [
                'work_user_id' => 1,
                'work_task_id' => 2,
                'work_date' => date('Y-m-d'),
                'work_minute' => 10,
            ],
            [
                'work_user_id' => 1,
                'work_task_id' => 3,
                'work_date' => date('Y-m-d'),
                'work_minute' => 15,
            ],
            [
                'work_user_id' => 1,
                'work_task_id' => 4,
                'work_date' => date('Y-m-d'),
                'work_minute' => 20,
            ],
        ]);
    }
}
