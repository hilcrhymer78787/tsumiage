<?php

namespace App\Domains\TaskRead\Queries;

use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TaskReadQuery
{
    public function getTasks(TaskReadParameter $params): Builder
    {
        $query =  Task::where('task_user_id', $params->userId)
            ->select(
                'tasks.task_id',
                'tasks.task_name',
                'tasks.created_at',
                'tasks.task_sort_key',
            )
            ->orderBy('task_sort_key')
            ->with(['works' => function ($query) use ($params) {
                $query
                    ->select(
                        'works.work_id',
                        'works.work_date',
                        'works.work_task_id',
                        'works.work_user_id',
                        'works.work_state',
                    )
                    ->where('work_date', $params->date);
            }]);
        return $query;
    }
}
