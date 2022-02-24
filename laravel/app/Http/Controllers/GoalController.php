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
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if ($request['id']) {
            return '編集';
            // Goal::where('goal_id', $request['id'])->update([
            //     'goal_name' => $request['goal_name'],
            //     'goal_status' => $request['goal_status'],
            //     'goal_default_minute' => $request['goal_default_minute'],
            //     'goal_user_id' => $loginInfo['id'],
            // ]);
        } else {
            Goal::create([
                'goal_minute' => $request['minute'],
                'goal_task_id' => $request['task_id'],
                'goal_user_id' => $loginInfo['id'],
                'goal_start_date' => $request['start_date'],
                'goal_end_date' => $request['end_date'],
            ]);
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
            $today = strtotime(date('Y-m-d'));
            $end_date = strtotime($goal['end_date']);
            $goal['deadline_day_count'] = ($end_date - $today) / (60 * 60 * 24);

            // 1:未達成,2:達成,3:失敗
            $sum_minute = (int)Work::where('work_task_id', $goal['task_id'])
                ->where("work_date", ">=", $goal['start_date'])
                ->where("work_date", "<=", $goal['end_date'])
                ->sum('work_minute');

            if ($sum_minute >= $goal['minute']) {
                $goal['state'] = 2;
            } else if (date('Y-m-d') >= $goal['end_date']) {
                $goal['state'] = 3;
            } else {
                $goal['state'] = 1;
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
