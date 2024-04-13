<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Goal;
use App\Models\Work;
use App\Services\UserService;
use App\Services\TaskService;


class TaskController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        // 友達判定
        if ($loginInfo['id'] != $request['userId']) {
            $is_friends = (new UserService())->checkIsFriends($loginInfo['id'],$request['userId']);
            if(!$is_friends){
                $errorMessage = 'このユーザは友達ではありません';
                return response()->json(['errorMessage' => $errorMessage], 500);
            }
        }

        $return['tasks'] = (new TaskService())->getTasksByUserId($request['userId']);

        $return['date'] = $request['date'];

        foreach ($return['tasks'] as $task) {
            $work = Work::where('work_task_id', $task['id'])
                ->where('work_date', $request['date'])
                ->select('work_id as id', 'work_state as state')
                ->first();
            if ($work) {
                $task['work'] = $work;
            } else {
                $obj['id'] = 0;
                $obj['state'] = 0;
                $task['work'] = $obj;
            }
        }

        return $return;
    }
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if ($request['task_id']) {
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
        Task::where('task_id', $request['task_id'])
            ->where('task_user_id', $loginInfo['id'])
            ->delete();
        Work::where('work_task_id', $request['task_id'])
            ->where('work_user_id', $loginInfo['id'])
            ->delete();
        Goal::where('goal_task_id', $request['task_id'])
            ->where('goal_user_id', $loginInfo['id'])
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
