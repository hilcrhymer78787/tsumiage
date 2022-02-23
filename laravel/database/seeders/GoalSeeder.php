<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Goal;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 20; $i++) {
            $end = $i + 5;
            Goal::create([
                'goal_minute' => 500,
                'goal_task_id' => $i % 4 + 1,
                'goal_user_id' => 1,
                'goal_start_date' => date("Y-m-${i}"),
                'goal_end_date' => date("Y-m-${end}"),
            ]);
        }
    }
}
