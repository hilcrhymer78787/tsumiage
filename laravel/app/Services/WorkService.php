<?php

namespace App\Services;

use App\Models\Work;
use App\Services\TaskService;

class WorkService
{
    public function getWorks($param)
    {
        $return['date'] = $param['date'];
        $return['tasks'] = (new TaskService())->getTasksByUserId($param['userId']);
        foreach ($return['tasks'] as $task) {
            $work = Work::where('work_task_id', $task['id'])
                ->where('work_date', $param['date'])
                ->select('work_id as id', 'work_state as state')
                ->first();
            $task['work'] = $work ?? ['id' => 0, 'state' => 0];
        }
        return $return;
    }
    public function getDataset($param)
    {
        $dataset['label'] = $param['task_name'];
        $dataset['borderColor'] = $param['color'];
        $dataset['data'] = [];
        for ($date = $param['start_date']; $date <= $param['end_date']; $date = date('Y-m-d', strtotime($date . '+1 day'))) {
            $sum_minute = (int)Work::where('work_task_id', $param['task_id'])
                ->where("work_date", ">=", date('Y-m-d', strtotime($param['start_date'])))
                ->where("work_date", "<=", date('Y-m-d', strtotime($date)))
                ->sum('work_minute');
            array_push($dataset['data'], $sum_minute);
        }
        return $dataset;
    }
    public function getLabels($param)
    {
        $labels = [];
        for ($date = $param['start_date']; $date <= $param['end_date']; $date = date('Y-m-d', strtotime($date . '+1 day'))) {
            array_push($labels, date('j日', strtotime($date)));
        }
        return $labels;
    }
    public function getGoalLine($param)
    {
        $dataset['label'] = '目標';
        $dataset['borderColor'] = $param['color'];
        $dataset['data'] = [];
        for ($date = $param['start_date']; $date <= $param['end_date']; $date = date('Y-m-d', strtotime($date . '+1 day'))) {
            array_push($dataset['data'], $param['minute']);
        }
        return $dataset;
    }
}
