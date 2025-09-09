<?php

namespace App\Domains\Shared\Calendar\Factories;


use App\Domains\Shared\Calendar\Entities\CalendarEntity;
use App\Domains\Shared\Task\Entities\TaskEntity;
use App\Domains\Shared\Work\Factories\WorkFactory;
use Illuminate\Support\Collection;

class CalendarFactory
{
    public function __construct(
        private readonly WorkFactory $workFactory,
    ) {}

    public function create(array $calendarModel): CalendarEntity
    {
        $tasks = $calendarModel['tasks'];
        $date = $calendarModel['date'];

        $taskEntities = $tasks->map(function ($task) {
            $workModel = $task['workModel'];
            $taskModel = $task['taskModel'];

            $workEntity = $workModel
                ? $this->workFactory->create($workModel)
                : $this->workFactory->empty($workModel);

            return new TaskEntity(
                taskId: $taskModel->task_id,
                taskName: $taskModel->task_name,
                createdAt: $taskModel->created_at,
                taskSortKey: $taskModel->task_sort_key,
                workEntity: $workEntity,
            );
        });

        return new CalendarEntity(
            date: $date,
            taskEntities: $taskEntities,
        );
    }
}
