<?php

namespace App\Services;

use App\Models\Invitation;
use App\Models\User;

class InvitationService
{
    public function invitateMySelf($roomId, $myId)
    {
        Invitation::create([
            'invitation_room_id' => $roomId,
            'invitation_from_user_id' => $myId,
            'invitation_to_user_id' => $myId,
            'invitation_status' => 2,
        ]);
        User::where('id', $myId)->update([
            'user_room_id' => $roomId,
        ]);
    }
}
