<?php

namespace App\Domains\WorkCreate\Queries;

use App\Domains\WorkCreate\Parameters\WorkCreateParameter;
use App\Models\Work;

class WorkCreateQuery
{
    public function updateOrCreateWork(WorkCreateParameter $params, int $userId): Work
    {
        return Work::updateOrCreate(
            [
                'work_user_id' => $userId,
                'work_date'    => $params->date,
                'work_task_id' => $params->taskId,
            ],
            [
                'work_state'   => $params->state,
            ]
        );
    }
}
