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
        for ($day = 1; $day <= 28; $day++) {
            for ($taskId = 1; $taskId <= 4; $taskId++) {
                DB::table('works')->insert([
                    [
                        'work_user_id' => 1,
                        'work_task_id' => $taskId,
                        'work_date' => date("Y-m-${day}"),
                        'work_minute' => 10 + $taskId * 5,
                    ],
                ]);
            }
        }
    }
}
