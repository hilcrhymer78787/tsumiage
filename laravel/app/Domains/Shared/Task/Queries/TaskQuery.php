<?php

namespace App\Domains\Shared\Task\Queries;


use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;

class TaskQuery
{
    public function getTasksBuilder(int $userId): Builder
    {
        $query = Task::where('task_user_id', $userId)
            ->select(
                'tasks.task_id',
                'tasks.task_name',
                'tasks.created_at',
                'tasks.task_sort_key'
            )
            ->orderBy('task_sort_key');

        return $query;
    }
    public function deleteTaskByUserId(int $userId): void
    {
        Task::where('task_user_id', $userId)->delete();
    }
}
