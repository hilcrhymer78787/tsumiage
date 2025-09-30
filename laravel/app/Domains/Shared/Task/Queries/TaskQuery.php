<?php

namespace App\Domains\Shared\Task\Queries;


use App\Models\Task;
use Illuminate\Support\Collection;

class TaskQuery
{
    public function getTasks(int $userId): Collection
    {
        return Task::where('task_user_id', $userId)
            ->select(
                'tasks.task_id',
                'tasks.task_name',
                'tasks.created_at',
                'tasks.task_sort_key'
            )
            ->orderBy('task_sort_key')
            ->get();
    }
    public function deleteTaskByUserId(int $userId): void
    {
        Task::where('task_user_id', $userId)->delete();
    }
    public function getTaskById(int $taskId): ?Task
    {
        return Task::where('task_id', $taskId)->first();
    }
}
