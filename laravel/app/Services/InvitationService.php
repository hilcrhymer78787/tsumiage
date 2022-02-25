<?php

namespace App\Services;

use App\Models\Invitation;
use App\Models\User;

class InvitationService
{
    public function invitateMySelf($myId)
    {
        Invitation::create([
            'invitation_from_user_id' => $myId,
            'invitation_to_user_id' => $myId,
            'invitation_status' => 2,
        ]);
    }
}
