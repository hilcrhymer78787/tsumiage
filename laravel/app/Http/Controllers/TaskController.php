<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Work;
use App\Services\UserService;
class TaskController extends Controller
{
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        Task::where('task_id', $request['id'])
            ->where('task_user_id', $loginInfo['id'])
            ->delete();
        Work::where('work_task_id', $request['id'])
            ->where('work_user_id', $loginInfo['id'])
            ->delete();

        return $request;
    }
    public function sort(Request $request)
    {
        foreach ($request['tasks'] as $index => $task) {
            Task::where('task_id', $task['id'])->update([
                'task_sort_key' => $index,
            ]);
        }
    }
}
