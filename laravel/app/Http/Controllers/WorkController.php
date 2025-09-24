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
