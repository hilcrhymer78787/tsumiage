<?php

namespace App\Domains\WorkReadMonth\Services;

use App\Domains\Shared\Task\Entities\TaskEntity;
use App\Domains\Shared\Work\Factories\WorkFactory;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class WorkReadMonthBuilder
{
    public function __construct(
        private readonly WorkFactory $workFactory,
    ) {}

    public function build(int $paramsYear, int $paramsMonth, Collection $taskModels, Collection $workModels): Collection
    {
        $startOfMonth = Carbon::create($paramsYear, $paramsMonth, 1);
        $endOfMonth   = $startOfMonth->copy()->endOfMonth();

        // 1日〜末日までの日付コレクションを生成
        $dates = collect(
            range(0, $endOfMonth->day - 1)
        )->map(fn($i) => $startOfMonth->copy()->addDays($i));

        $calendars = $dates->map(function (Carbon $date) use ($taskModels, $workModels) {
            $dayTasks = $taskModels->map(function ($taskModel) use ($date, $workModels) {
                $workModel = $workModels
                    ->where('work_task_id', $taskModel->task_id)
                    ->where('work_date', $date->toDateString())
                    ->first();

                return [
                    "taskModel" => $taskModel,
                    "workModel" => $workModel
                ];
            });

            return [
                "date"  => $date->toDateString(),
                "tasks" => $dayTasks,
            ];
        });

        return collect($calendars);
    }
}
