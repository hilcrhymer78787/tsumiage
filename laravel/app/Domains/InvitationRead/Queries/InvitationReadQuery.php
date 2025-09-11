<?php

namespace App\Domains\InvitationRead\Queries;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Builder;

class InvitationReadQuery
{
    public function getFromFriendsBuilder(int $loginInfoId): Builder
    {
        return Invitation::where('invitation_to_user_id', $loginInfoId)
            ->where('invitation_status', 1)
            ->leftjoin('users', 'invitations.invitation_from_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id');
    }
    public function getNowFriendsBuilder(int $loginInfoId): Builder
    {
        return Invitation::join('users', function ($join) use ($loginInfoId) {
            $join->on('users.id', '=', 'invitations.invitation_from_user_id')
                ->where('invitations.invitation_to_user_id', $loginInfoId)
                ->orOn('users.id', '=', 'invitations.invitation_to_user_id')
                ->where('invitations.invitation_from_user_id', $loginInfoId);
        })
            ->where('invitation_status', 2)
            ->select('users.id', 'users.email', 'users.name', 'users.user_img', 'invitations.invitation_id');
    }
    public function getToFriendsBuilder(int $loginInfoId): Builder
    {
        return Invitation::where('invitation_from_user_id', $loginInfoId)
            ->where('invitation_status', 1)
            ->leftjoin('users', 'invitations.invitation_to_user_id', '=', 'users.id')
            ->select('id', 'email', 'name', 'user_img', 'invitation_id');
    }
}
