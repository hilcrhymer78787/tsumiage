<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvitationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('invitations')->insert([
            [
              'invitation_from_user_id' => 2,
              'invitation_to_user_id' => 1,
              'invitation_status' => 1,
            ],
            [
              'invitation_from_user_id' => 3,
              'invitation_to_user_id' => 1,
              'invitation_status' => 2,
            ],
            [
              'invitation_from_user_id' => 1,
              'invitation_to_user_id' => 4,
              'invitation_status' => 1,
            ],
            [
              'invitation_from_user_id' => 1,
              'invitation_to_user_id' => 5,
              'invitation_status' => 2,
            ],
            [
              'invitation_from_user_id' => 1,
              'invitation_to_user_id' => 6,
              'invitation_status' => 1,
            ],
            [
              'invitation_from_user_id' => 7,
              'invitation_to_user_id' => 1,
              'invitation_status' => 1,
            ],
         ]);
    }
}