<?php

namespace App\Services;

use App\Models\User;
use App\Models\Invitation;

class UserService
{
    public function getLoginInfoByRequest($request)
    {
        $token = substr($request->header('Authorization'), 7);
        $loginInfo = User::where('token', $token)
            ->select('id', 'email', 'name', 'user_img', 'token')
            ->first();
        return $loginInfo;
    }
    public function getFromFriends($userId)
    {
        return Invitation::where('invitation_to_user_id', $userId)
            ->where('invitation_status', 1)
            ->leftjoin('users', 'invitations.invitation_from_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id')
            ->get();
    }
    public function getNowFriends($userId)
    {
        $users = [];

        $usersArray1 = Invitation::where('invitation_to_user_id', $userId)
            ->where('invitation_status', 2)
            ->leftjoin('users', 'invitations.invitation_from_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id')
            ->get();

        $usersArray2 = Invitation::where('invitation_from_user_id', $userId)
            ->where('invitation_status', 2)
            ->leftjoin('users', 'invitations.invitation_to_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id')
            ->get();

        foreach ($usersArray1 as $user) {
            array_push($users, $user);
        }
        foreach ($usersArray2 as $user) {
            array_push($users, $user);
        }

        return $users;
    }
    public function getToFriends($userId)
    {
        return Invitation::where('invitation_from_user_id', $userId)
            ->where('invitation_status', 1)
            ->leftjoin('users', 'invitations.invitation_to_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id')
            ->get();
    }
    public function checkIsFriends($userId1, $userId2)
    {
        $bool = Invitation::where('invitation_from_user_id', $userId1)
            ->where('invitation_to_user_id', $userId2)
            ->where('invitation_status', 2)
            ->first();
        if ($bool) {
            return true;
        }
        $bool2 = Invitation::where('invitation_to_user_id', $userId1)
            ->where('invitation_from_user_id', $userId2)
            ->where('invitation_status', 2)
            ->first();
        if ($bool2) {
            return true;
        }
        return false;
    }
}
