<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use App\Models\Work;
use App\Services\UserService;
use App\Services\TaskService;


class TaskController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));

        $tasks = (new TaskService())->getTasksByRoomId($loginInfo['user_room_id']);

        foreach ($tasks as $task) {
            $query = Work::where('work_task_id', $task['task_id'])
                ->whereYear('work_date', $request['year'])
                ->whereMonth('work_date', $request['month'])
                ->whereDay('work_date', $request['day']);
            $task['minute'] = (int)$query->sum('work_minute');
            $task['works'] = $query->leftjoin('users', 'works.work_user_id', '=', 'users.id')
                ->select('work_id', 'work_date', 'work_minute', 'work_user_id', 'name as work_user_name', 'user_img as work_user_img')
                ->get();
        }
        
        $return['tasks'] = $tasks;
        return $return;
    }
    public function create(Request $request)
    {
        if ($request['task']['task_id']) {
            Task::where('task_id', $request['task']['task_id'])
                ->update($request['task']);
        } else {
            Task::create($request['task']);
        }
    }
    public function delete(Request $request)
    {
        Task::where('task_id', $request['task_id'])
            ->delete();

        Work::where('work_task_id', $request['task_id'])
            ->delete();

        return $request;
    }
    public function sortset(Request $request)
    {
        foreach ($request['tasks'] as $index => $task) {
            Task::where('task_id', $task['task_id'])->update([
                'task_sort_key' => $index,
            ]);
        }
    }
}
