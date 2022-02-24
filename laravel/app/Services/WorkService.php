<?php

namespace App\Services;

use App\Models\Work;

class WorkService
{
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
