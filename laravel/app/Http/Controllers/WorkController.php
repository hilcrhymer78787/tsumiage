<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\TaskService;
use App\Services\WorkService;
use App\Models\Work;

class WorkController extends Controller
{
    public function read_calendar(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        // 日別データ
        $year_month = $request['year'] . '-' . $request['month'];
        $last_day = date('d', strtotime("last day of " . $year_month));

        $return['calendars'] = [];
        for ($day = 1; $day <= $last_day; $day++) {
            $calendar['date'] = date('Y-m-d', strtotime($year_month . '-' . $day));
            $calendar['minute'] = (int)Work::where('work_user_id', $loginInfo['id'])
                ->where('work_date', $calendar['date'])
                ->sum('work_minute');
            array_push($return['calendars'], $calendar);
        }

        // データ
        $GRAPH_COLORS = [
            "#2196f390",
            "#ff525290",
            "#fff9b1",
            "#d7e7af",
            "#a5d4ad",
            "#a3bce2",
            "#a59aca",
            "#cfa7cd",
            "#f4b4d0",
            "#f5b2b2",
        ];
        $analytics['datasets'] = [];
        $tasks = (new TaskService())->getTasksByUserId($loginInfo['id']);
        foreach ($tasks as $index => $task) {
            $dataset = (new WorkService())->getDataset([
                'task_id' => $task['id'],
                'task_name' => $task['name'],
                'start_date' => date('Y-m-d', strtotime($year_month . '-1')),
                'end_date' => date('Y-m-d', strtotime($year_month . '-' . $last_day)),
                'color' => $GRAPH_COLORS[$index]
            ]);
            array_push($analytics['datasets'], $dataset);
        }
        $analytics['labels'] = (new WorkService())->getLabels([
            'start_date' => date('Y-m-d', strtotime($year_month . '-1')),
            'end_date' => date('Y-m-d', strtotime($year_month . '-' . $last_day)),
        ]);
        $return['analytics'] = $analytics;

        return $return;
    }
    public function create(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));

        // 重複確認
        $double = Work::where('work_date', $request['date'])
            ->where('work_task_id', $request['task_id'])
            ->first();

        // 編集
        if ($double) {
            Work::where('work_user_id', $loginInfo['id'])
                ->where('work_id', $request['id'])
                ->update([
                    'work_user_id' => $loginInfo['id'],
                    'work_date' => $request['date'],
                    'work_task_id' => $request['task_id'],
                    'work_minute' => $request['minute'],
                    'work_memo' => $request['memo'],
                ]);
            return;
        }

        // 新規登録
        Work::create([
            'work_user_id' => $loginInfo['id'],
            'work_date' => $request['date'],
            'work_task_id' => $request['task_id'],
            'work_minute' => $request['minute'],
            'work_memo' => $request['memo'],
        ]);
        return;
    }
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        Work::where('work_user_id', $loginInfo['id'])
            ->where('work_date', $request['date'])
            ->where('work_task_id', $request['task_id'])
            ->delete();
    }
}
