<?php

namespace App\Domains\TaskDelete\Queries;

use App\Models\Task;
use App\Models\Work;

class TaskDeleteQuery
{
    public function deleteTask(int $taskId, int $userId): int
    {
        return Task::where('task_id', $taskId)
            ->where('task_user_id', $userId)
            ->delete();
    }
    public function deleteWork(int $taskId, int $userId): int
    {
        return Work::where('work_task_id', $taskId)
            ->where('work_user_id', $userId)
            ->delete();
    }
}
