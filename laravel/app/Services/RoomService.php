<?php

namespace App\Services;

use App\Models\Invitation;
use App\Models\User;
use App\Models\Room;

class RoomService
{
    public function getJoinedRooms($userId)
    {
        return Invitation::where('invitation_to_user_id', $userId)
            ->where('invitation_status', 2)
            ->leftjoin('rooms', 'invitations.invitation_room_id', '=', 'rooms.room_id')
            ->select('invitation_id', 'room_id', 'room_name', 'room_img')
            ->get();
    }
    public function getInvitedRooms($userId)
    {
        return Invitation::where('invitation_to_user_id', $userId)
            ->where('invitation_status', '<', 2)
            ->leftjoin('rooms', 'invitations.invitation_room_id', '=', 'rooms.room_id')
            ->leftjoin('users', 'invitations.invitation_from_user_id', '=', 'users.id')
            ->select('invitation_id', 'invitation_status', 'room_id', 'room_name', 'room_img', 'name')
            ->get();
    }
}
