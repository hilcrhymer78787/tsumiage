<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // 'task_user_id' => $this->faker->numberBetween(1,10),
            // 'task_name' => $this->faker->word(),
            // 'task_status' => $this->faker->numberBetween(1,4),
            // 'task_default_minute' => $this->faker->numberBetween(1,60),
        ];
    }
}
