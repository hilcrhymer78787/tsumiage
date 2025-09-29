<?php

namespace App\Domains\TaskRead\Queries;

use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Models\Task;
use Illuminate\Support\Collection;

class TaskReadQuery
{
    public function getTasks(TaskReadParameter $params): Collection
    {
        return Task::where('task_user_id', $params->userId)
            ->select(
                'tasks.task_id',
                'tasks.task_name',
                'tasks.created_at',
                'tasks.task_sort_key',
            )
            ->orderBy('task_sort_key')
            ->with(['work' => function ($query) use ($params) {
                $query
                    ->select(
                        'works.work_id',
                        'works.work_date',
                        'works.work_task_id',
                        'works.work_user_id',
                        'works.work_state',
                    )
                    ->where('work_date', $params->date);
            }])
            ->get();
    }
}
