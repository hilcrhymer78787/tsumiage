<?php

namespace App\Domains\TaskRead\Entities;

use Illuminate\Support\Collection;

class TaskReadEntity
{
    public function __construct(
        private readonly string $date,
        /** @var Collection<int, TaskEntity> */
        private readonly Collection $taskEntities,
    ) {}

    public function getDate(): string
    {
        return $this->date;
    }

    public function getTaskEntities(): Collection
    {
        return $this->taskEntities;
    }

}
