<?php

namespace App\Domains\TaskSort\Queries;

use App\Models\Task;

class TaskSortQuery
{
    public function sortTask(array $taskIds, int $userId): void
    {
        foreach ($taskIds as $index => $id) {
            Task::where('task_id', $id)->update([
                'task_sort_key' => $index,
                'task_user_id' => $userId,
            ]);
        }
    }
}
