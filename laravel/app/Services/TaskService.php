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
                'task_default_minute as default_minute',
                'task_sort_key as sort_key',
                'task_status as status',
            )
            ->orderBy('task_sort_key')
            ->get();
        return $tasks;
    }
    public function createcDummyTask($userId)
    {
        Task::create([
            'task_name' => '洗い物',
            'task_default_minute' => 15,
            'task_user_id' => $userId,
        ]);
        Task::create([
            'task_name' => '料理',
            'task_default_minute' => 30,
            'task_user_id' => $userId,
        ]);
        Task::create([
            'task_name' => '洗濯',
            'task_default_minute' => 15,
            'task_user_id' => $userId,
        ]);
    }
}
