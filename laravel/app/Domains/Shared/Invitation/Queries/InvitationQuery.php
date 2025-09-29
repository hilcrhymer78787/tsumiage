<?php

namespace App\Domains\Shared\Invitation\Queries;


use App\Models\Invitation;

class InvitationQuery
{
    public function deleteInvitationByUserId(int $userId): void
    {
        Invitation::where(function ($query) use ($userId) {
            $query->where('invitation_to_user_id', $userId)
                  ->orWhere('invitation_from_user_id', $userId);
        })->delete();
    }
}
