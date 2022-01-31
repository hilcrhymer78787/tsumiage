<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function getTasksByRoomId($roomId)
    {
        $tasks = Task::where('task_room_id', $roomId)
            ->where('task_is_everyday', 1)
            ->select('task_id','task_name as name', 'task_default_minute', 'task_is_everyday', 'task_sort_key')
            ->orderBy('task_sort_key')
            ->get();
        return $tasks;
    }
    public function createcDummyTask($roomId)
    {
        Task::create([
            'task_name' => '洗い物',
            'task_default_minute' => 15,
            'task_is_everyday' => 1,
            'task_room_id' => $roomId,
        ]);
        Task::create([
            'task_name' => '料理',
            'task_default_minute' => 30,
            'task_is_everyday' => 1,
            'task_room_id' => $roomId,
        ]);
        Task::create([
            'task_name' => '洗濯',
            'task_default_minute' => 15,
            'task_is_everyday' => 1,
            'task_room_id' => $roomId,
        ]);
    }
}
