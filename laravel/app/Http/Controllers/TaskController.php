<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Task;
use App\Models\Work;
use App\Services\UserService;
use App\Http\Requests\TaskReadRequest;
use App\Http\Resources\TaskReadResource;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Domains\TaskRead\Interfaces\Services\TaskReadServiceInterface;
use Illuminate\Support\Facades\Log;
use Throwable;

class TaskController extends Controller
{
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
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
