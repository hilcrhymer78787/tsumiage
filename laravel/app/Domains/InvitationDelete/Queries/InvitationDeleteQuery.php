<?php

namespace App\Domains\InvitationDelete\Queries;

use App\Domains\InvitationDelete\Parameters\InvitationDeleteParameter;
use App\Models\Invitation;
use App\Models\User;

class InvitationDeleteQuery
{
    public function deleteInvitation(int $invitationId, int $myUserId): int
    {
        return Invitation::where('invitation_id', $invitationId)
            ->where(function ($query) use ($myUserId) {
                $query->where('invitation_to_user_id', $myUserId)
                    ->orWhere('invitation_from_user_id', $myUserId);
            })
            ->delete();
    }
}
