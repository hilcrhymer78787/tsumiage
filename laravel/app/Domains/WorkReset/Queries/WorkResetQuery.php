<?php

namespace App\Domains\WorkReset\Queries;

use App\Models\Task;
use App\Models\Work;
use Carbon\Carbon;

class WorkResetQuery
{
    public function resetWork(int $userId): int
    {
       return Work::where('work_user_id', $userId)->delete();
    }

    public function taskUpdate(int $userId): int
    {
        return Task::where('task_user_id', $userId)->update([
            'created_at' => Carbon::now()
        ]);
    }
}
