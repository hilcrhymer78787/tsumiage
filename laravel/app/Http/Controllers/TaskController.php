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

        $tasks = (new TaskService())->getTasksByUserId($loginInfo['id']);

        // foreach ($tasks as $task) {
        //     $query = Work::where('work_task_id', $task['task_id'])
        //         ->whereYear('work_date', $request['year'])
        //         ->whereMonth('work_date', $request['month'])
        //         ->whereDay('work_date', $request['day']);
        //     $task['minute'] = (int)$query->sum('work_minute');
        //     $task['works'] = $query->leftjoin('users', 'works.work_user_id', '=', 'users.id')
        //         ->select('work_id', 'work_date', 'work_minute', 'work_user_id', 'name as work_user_name', 'user_img as work_user_img')
        //         ->get();
        // }

        $return['tasks'] = $tasks;
        return $return;
    }
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if ($request['task']['task_id']) {
            Task::where('task_id', $request['task']['task_id'])->update([
                'task_name' => $request['task']['task_name'],
                'task_status' => $request['task']['task_status'],
                'task_default_minute' => $request['task']['task_default_minute'],
                'task_point_per_minute' => $request['task']['task_point_per_minute'],
                'task_user_id' => $loginInfo['id'],
            ]);
        } else {
            Task::create([
                'task_name' => $request['task']['task_name'],
                'task_status' => $request['task']['task_status'],
                'task_default_minute' => $request['task']['task_default_minute'],
                'task_point_per_minute' => $request['task']['task_point_per_minute'],
                'task_user_id' => $loginInfo['id'],
            ]);
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
