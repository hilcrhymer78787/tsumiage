<?php

namespace Database\Factories;

use App\Models\Work;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Work::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'work_task_id' => $this->faker->numberBetween(1,10),
            'work_user_id' => $this->faker->numberBetween(1,2),
            'work_state' => $this->faker->numberBetween(0,2),
        ];
    }
}
