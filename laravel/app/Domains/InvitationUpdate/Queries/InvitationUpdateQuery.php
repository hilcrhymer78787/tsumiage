<?php

namespace App\Domains\InvitationUpdate\Queries;

use App\Domains\InvitationUpdate\Parameters\InvitationUpdateParameter;
use App\Models\Invitation;
use App\Models\User;

class InvitationUpdateQuery
{
    public function getInvitation(int $invitationId, int $userId): Invitation | null
    {
        return Invitation::where('invitation_id', $invitationId)
            ->where('invitation_to_user_id', $userId)
            ->where('invitation_status', 1)
            ->first();
    }
    public function getUserById(int $userId): User
    {
        return User::where('id', $userId)->first();
    }
    public function updateInvitation(int $invitationId): int
    {
        return Invitation::where('invitation_id', $invitationId)
            ->update(['invitation_status' => 2]);
    }
}
