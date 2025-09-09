<?php

namespace App\Domains\TaskRead\Factories;

use App\Domains\TaskRead\Entities\TaskReadEntity;
use App\Domains\Shared\Task\Factories\TaskFactory;
use App\Models\Task;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class TaskReadFactory
{
    public function __construct(
        private readonly TaskFactory $taskFactory,
    ) {}

    public function create(string $date, Collection $taskModels): TaskReadEntity
    {
        $taskEntities = $taskModels->map(function (Task $taskModel) {
            return $this->taskFactory->create($taskModel);
        });
        return new TaskReadEntity($date, $taskEntities);
    }
}
