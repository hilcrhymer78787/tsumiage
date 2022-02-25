<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      $this->call(usersTableSeeder::class);
      $this->call(tasksTableSeeder::class);
      $this->call(worksTableSeeder::class);
      $this->call(InvitationsTableSeeder::class);
      $this->call(GoalSeeder::class);
    }
}
