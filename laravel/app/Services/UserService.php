<?php

namespace App\Services;

use App\Models\User;
use App\Models\Invitation;

class UserService
{
    public function getLoginInfoByToken($token)
    {
        $loginInfo = User::where('token', $token)
            ->leftjoin('rooms', 'users.user_room_id', '=', 'rooms.room_id')
            ->select('id', 'email', 'name', 'user_img', 'room_id', 'user_room_id', 'room_name', 'room_img')
            ->first();
        return $loginInfo;
    }
    public function getJoinedUsersByRoomId($roomId)
    {
        $users = Invitation::where('invitation_room_id', $roomId)
            ->where('invitation_status', 2)
            ->leftjoin('users', 'invitations.invitation_to_user_id', '=', 'users.id')
            ->select('id', 'name')
            ->get();

        return $users;
    }
    public function getInvitingUsersByRoomId($roomId)
    {
        $users = Invitation::where('invitation_room_id', $roomId)
            ->where('invitation_status', '<', 2)
            ->leftjoin('users', 'invitations.invitation_to_user_id', '=', 'users.id')
            ->select('id', 'name')
            ->get();

        return $users;
    }
}
