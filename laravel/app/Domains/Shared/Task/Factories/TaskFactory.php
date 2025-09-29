<?php

namespace App\Domains\Shared\Task\Factories;


use App\Domains\Shared\Task\Entities\TaskEntity;
use App\Domains\Shared\Work\Factories\WorkFactory;
use App\Models\Task;

class TaskFactory
{
    public function __construct(
        private readonly WorkFactory $workFactory,
    ) {}

    public function create(Task $taskModel): TaskEntity
    {
        $work = $taskModel->work;
        !!$workEntity = $work
            ? $this->workFactory->create($work)
            : $this->workFactory->empty();
            
        return new TaskEntity(
            taskId: $taskModel->task_id,
            taskName: $taskModel->task_name,
            createdAt: $taskModel->created_at,
            taskSortKey: $taskModel->task_sort_key,
            workEntity: $workEntity,
        );
    }
}
