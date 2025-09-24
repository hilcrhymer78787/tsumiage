<?php

namespace App\Domains\WorkDelete\Queries;

use App\Models\Work;

class WorkDeleteQuery
{
    public function deleteWork(int $workId, int $userId): int
    {
        return Work::where('work_id', $workId)
            ->where('work_user_id', $userId)
            ->delete();
    }
}
