<?php

namespace App\Domains\TaskCreate\Queries;

use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use App\Models\Task;

class TaskCreateQuery
{
    public function updateOrCreateTask(TaskCreateParameter $params, int $userId): Task
    {
        return Task::updateOrCreate(
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
    public function getIsExistMyTask(int $taskId, int $userId): bool
    {
        return Task::where('task_id', $taskId)
            ->where('task_user_id', $userId)
            ->exists();
    }
}
