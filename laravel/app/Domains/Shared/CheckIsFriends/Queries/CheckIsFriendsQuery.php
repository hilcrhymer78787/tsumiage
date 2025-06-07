<?php

namespace App\Domains\Shared\CheckIsFriends\Queries;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class CheckIsFriendsQuery
{
    public function checkIsFriends(int $userId1, int $userId2): Builder
    {
        return Invitation::where('invitation_status', 2)
            ->where(function ($query) use ($userId1, $userId2) {
                $query
                    ->where(function ($q) use ($userId1, $userId2) {
                        $q->where('invitation_from_user_id', $userId1)
                            ->where('invitation_to_user_id', $userId2);
                    })
                    ->orWhere(function ($q) use ($userId1, $userId2) {
                        $q->where('invitation_from_user_id', $userId2)
                            ->where('invitation_to_user_id', $userId1);
                    });
            });
    }
}
