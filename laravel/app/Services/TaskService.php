<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function getTasksByUserId($userId)
    {
        $tasks = Task::where('task_user_id', $userId)
            ->select(
                'task_id as id',
                'task_name as name',
                'task_sort_key as sort_key',
            )
            ->orderBy('task_sort_key')
            ->get();
        return $tasks;
    }
    public function createcDummyTask($userId)
    {
        Task::create([
            'task_name' => '洗い物',
            'task_user_id' => $userId,
        ]);
        Task::create([
            'task_name' => '料理',
            'task_user_id' => $userId,
        ]);
        Task::create([
            'task_name' => '洗濯',
            'task_user_id' => $userId,
        ]);
    }
}
