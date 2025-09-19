<?php

namespace App\Domains\Shared\Invitation\Queries;


use App\Models\Invitation;
use Illuminate\Database\Eloquent\Builder;

class InvitationQuery
{
    public function getInvitationsBuilder(int $userId): Builder
    {
        $query = Invitation::where('task_user_id', $userId)
            ->select(
                'tasks.task_id',
                'tasks.task_name',
                'tasks.created_at',
                'tasks.task_sort_key'
            )
            ->orderBy('task_sort_key');

        return $query;
    }
    public function deleteInvitationByUserId(int $userId): void
    {
        Invitation::where(function ($query) use ($userId) {
            $query->where('invitation_to_user_id', $userId)
                  ->orWhere('invitation_from_user_id', $userId);
        })->delete();
    }
}
