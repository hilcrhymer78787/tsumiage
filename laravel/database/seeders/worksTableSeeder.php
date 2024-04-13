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
        for ($date = date("Y-m-d",strtotime("-3 month")); $date <= date('Y-m-d'); $date = date('Y-m-d', strtotime($date . '+1 day'))) {
            for ($taskId = 1; $taskId <= 4; $taskId++) {
                DB::table('works')->insert([
                    [
                        'work_user_id' => 1,
                        'work_task_id' => $taskId,
                        'work_date' => date($date),
                        'work_minute' => 10 + $taskId * 5,
                        'work_state' => $taskId % 3,
                    ],
                ]);
            }
        }
    }
}
