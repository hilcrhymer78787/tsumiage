<?php

namespace App\Domains\Shared\Work\Queries;


use App\Models\Work;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class WorkQuery
{
    public function getWorks(int $userId, int $year, int $month): Collection
    {
        return Work::where('work_user_id', $userId)
            ->whereYear('work_date', $year)
            ->whereMonth('work_date', $month)
            ->select(
                'works.work_id',
                'works.work_date',
                'works.work_task_id',
                'works.work_user_id',
                'works.work_state',
                'works.created_at'
            )
            ->get();
    }
    public function deleteWorkByUserId(int $userId): void
    {
        Work::where('work_user_id', $userId)->delete();
    }
}
