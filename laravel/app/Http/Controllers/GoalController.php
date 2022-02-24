<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Room;
use App\Models\User;
use App\Models\Goal;
use App\Models\Work;
use App\Services\UserService;
use Illuminate\Http\Request;
use App\Services\WorkService;


class GoalController extends Controller
{
    public function create(Request $request)
    {
        // メールアドレスが存在するか確認
        $toUserData = User::where('email', $request['email'])->first();
        if (!$toUserData) {
            return response()->json(['errorMessage' => 'このメールアドレスは登録されていません'], 500);
        }
    }
    public function read(Request $request)
    {
        // 'goal_id',
        // 'goal_minute',
        // 'goal_task_id',
        // 'goal_user_id',
        // 'goal_start_date',
        // 'goal_end_date',
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        $goals = Goal::where('goal_user_id', $loginInfo['id'])
            ->leftjoin('tasks', 'goals.goal_task_id', '=', 'tasks.task_id')
            // ->where('goal_task_id', $loginInfo['id'])
            ->select(
                'goal_id as id',
                'goal_minute as minute',
                'goal_task_id as task_id',
                'goal_user_id as user_id',
                'goal_start_date as start_date',
                'goal_end_date as end_date',
                'task_name',
            )
            ->get();

        foreach ($goals as $goal) {
            // 1:未達成,2:達成,3:失敗
            $sum_minute = (int)Work::where('work_task_id', $goal['task_id'])
                ->where("work_date", ">=", $goal['start_date'])
                ->where("work_date", "<=", $goal['end_date'])
                ->sum('work_minute');

            if ($sum_minute >= $goal['minute']) {
                $goal['state'] = '達成';
            } else if (date('Y-m-d') >= $goal['end_date']) {
                $goal['state'] = '失敗';
            } else {
                $goal['state'] = '未達成';
            }

            $goal['sum_minute'] = $sum_minute;

            // データ
            $analytics['labels'] = $dataset = (new WorkService())->getLabels([
                'start_date' => $goal['start_date'],
                'end_date' => $goal['end_date'],
            ]);
            $analytics['datasets'] = [];
            $dataset = (new WorkService())->getDataset([
                'task_id' => $goal['task_id'],
                'task_name' => $goal['task_name'],
                'start_date' => $goal['start_date'],
                'end_date' => $goal['end_date'],
                'color' => '#2196f390'
            ]);
            array_push($analytics['datasets'], $dataset);
            $dataset = (new WorkService())->getGoalLine([
                'minute' => $goal['minute'],
                'start_date' => $goal['start_date'],
                'end_date' => $goal['end_date'],
                'color' => '#ff525290'
            ]);
            array_push($analytics['datasets'], $dataset);


            $goal['analytics'] = $analytics;
        }

        $return['goals'] = $goals;
        return $return;
    }
}
