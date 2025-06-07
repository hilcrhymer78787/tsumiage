<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Work;
use App\Services\TaskService;
use App\Services\UserService;
use App\Services\WorkService;
use App\Http\Requests\TaskReadRequest;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Domains\TaskRead\Interfaces\Services\TaskReadServiceInterface;
use Illuminate\Support\Facades\Log;
use Throwable;


class TaskController extends Controller
{
    private TaskReadServiceInterface $service;

    public function __construct(TaskReadServiceInterface $service)
    {
        $this->service = $service;
    }

    // 型のバリデーションを行う
    public function read(TaskReadRequest $request) //TODO: 型をつける
    {
        try {
            // 型を変換する {user_id:string} → {userId:int}
            $params = TaskReadParameter::makeParams($request->validated());
            $result = $this->service->taskRead($params, $request);
            return response()->json($result);
        } catch (Throwable $error) {

            //TODO debugErrorというグローバル関数を作る
            // debugError($error);
            Log::error('TaskReadエラー', [
                'message' => $error->getMessage(),
                'file' => $error->getFile(),
                'line' => $error->getLine(),
                'trace' => $error->getTraceAsString(),
            ]);

            //TODO ErrorResourceで共通化
            // return ErrorResource::unexpectedError($error);
            return response()->json([
                'code' => 'UNEXPECTED_ERROR',
                'message' => '予期せぬエラーが発生しました。',
                'error_detail' => $error->getMessage(), // 開発中のみ見せる。公開環境では消す or コメントアウト。
            ], 500);
        }
    }
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
