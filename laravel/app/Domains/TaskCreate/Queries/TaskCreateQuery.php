<?php

namespace App\Domains\TaskCreate\Queries;

use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use App\Models\Task;

class TaskCreateQuery
{
    public function createTask(TaskCreateParameter $params, int $userId): Task|null
    {
        return Task::create([
            'task_name' => $params->name,
            'task_user_id' => $userId,
        ]);
    }
    public function updateTask(TaskCreateParameter $params, int $userId): void
    {
        Task::where('task_id', $params->id)->update([
            'task_name' => $params->name,
            'task_user_id' => $userId,
        ]);
    }
}
