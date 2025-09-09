<?php

namespace App\Domains\Shared\Work\Factories;


use App\Domains\Shared\Work\Entities\WorkEntity;
use App\Models\Work;

class WorkFactory
{
    public function create(Work $work): WorkEntity
    {
        return new WorkEntity(
            workId: $work->work_id,
            workDate: $work->work_date,
            workTaskId: $work->work_task_id,
            workUserId: $work->work_user_id,
            workState: $work->work_state,
        );
    }
    public function empty(): WorkEntity
    {
        return new WorkEntity(
            workId: 0,
            workDate: "",
            workTaskId: 0,
            workUserId: 0,
            workState: 0,
        );
    }
}
