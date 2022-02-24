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
        Goal::create([
            'goal_minute' => 500,
            'goal_task_id' => 1,
            'goal_user_id' => 1,
            'goal_start_date' => date("Y-m-1"),
            'goal_end_date' => date("Y-m-28"),
        ]);
        Goal::create([
            'goal_minute' => 400,
            'goal_task_id' => 2,
            'goal_user_id' => 1,
            'goal_start_date' => date("Y-m-1"),
            'goal_end_date' => date("Y-m-28"),
        ]);
        Goal::create([
            'goal_minute' => 300,
            'goal_task_id' => 3,
            'goal_user_id' => 1,
            'goal_start_date' => date("Y-m-1"),
            'goal_end_date' => date("Y-m-28"),
        ]);
    }
}
