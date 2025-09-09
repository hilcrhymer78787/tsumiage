<?php

namespace App\Domains\Shared\Work\Queries;


use App\Models\Work;
use Illuminate\Database\Eloquent\Builder;

class WorkQuery
{
    public function getWorksBuilder(int $userId, int $year, int $month): Builder
    {
        $query = Work::where('work_user_id', $userId)
            ->whereYear('work_date', $year)
            ->whereMonth('work_date', $month)
            ->select(
                'works.work_id',
                'works.work_date',
                'works.work_task_id',
                'works.work_user_id',
                'works.work_state',
                'works.created_at'
            );

        return $query;
    }
}
