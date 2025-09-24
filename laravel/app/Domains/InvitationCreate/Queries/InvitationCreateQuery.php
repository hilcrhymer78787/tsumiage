<?php

namespace App\Domains\InvitationCreate\Queries;

use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Models\Invitation;

class InvitationCreateQuery
{
    public function updateOrCreateInvitation(InvitationCreateParameter $params, int $userId): Invitation
    {
        return Invitation::updateOrCreate(
            // 検索条件
            [
                'task_id' => $params->id,
            ],
            // 更新・作成する値
            [
                'task_name' => $params->name,
                'task_user_id' => $userId,
            ]
        );
    }
    public function getIsExistMyInvitation(int $taskId, int $userId): bool
    {
        return Invitation::where('task_id', $taskId)
            ->where('task_user_id', $userId)
            ->exists();
    }
}
