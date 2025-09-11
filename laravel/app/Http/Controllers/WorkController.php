<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\WorkService;
use App\Models\Work;
use App\Models\Task;
use Carbon\Carbon;

class WorkController extends Controller
{
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);

        // 重複確認
        $targetWork = Work::where('work_date', $request['date'])
            ->where('work_task_id', $request['task_id'])
            ->first();

        // 編集
        if ($targetWork) {
            Work::where('work_user_id', $loginInfo['id'])
                ->where('work_id', $targetWork['work_id'])
                ->update([
                    'work_user_id' => $loginInfo['id'],
                    'work_date' => $request['date'],
                    'work_task_id' => $request['task_id'],
                    'work_state' => $request['state'],
                ]);
            return;
        }

        // 新規登録
        Work::create([
            'work_user_id' => $loginInfo['id'],
            'work_date' => $request['date'],
            'work_task_id' => $request['task_id'],
            'work_state' => $request['state'],
        ]);
        return;
    }
    public function delete(Request $request)
    {
        Work::where('work_id', $request['id'])->delete();
    }
    public function reset(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        Work::where('work_user_id', $loginInfo['id'])->delete();
        Task::where('task_user_id', $loginInfo['id'])->update([
            'created_at' => Carbon::now()
        ]);
    }
}
