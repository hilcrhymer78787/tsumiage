<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Goal;
use App\Models\Work;
use App\Services\UserService;
use App\Services\TaskService;
use App\Services\WorkService;


class TaskController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        // 友達判定
        if ($loginInfo['id'] != $request['userId']) {
            $is_friends = (new UserService())->checkIsFriends($loginInfo['id'], $request['userId']);
            if (!$is_friends) {
                $errorMessage = 'このユーザは友達ではありません';
                return response()->json(['errorMessage' => $errorMessage], 500);
            }
        }

        $return = (new WorkService())->getWorks([
            'date' => $request['date'],
            'userId' => $request['userId'],
        ]);

        return $return;
    }
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if ($request['id']) {
            Task::where('task_id', $request['id'])->update([
                'task_name' => $request['name'],
                'task_user_id' => $loginInfo['id'],
            ]);
        } else {
            Task::create([
                'task_name' => $request['name'],
                'task_user_id' => $loginInfo['id'],
            ]);
        }
    }
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        Task::where('task_id', $request['id'])
            ->where('task_user_id', $loginInfo['id'])
            ->delete();
        Work::where('work_task_id', $request['id'])
            ->where('work_user_id', $loginInfo['id'])
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
