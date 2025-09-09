<?php

namespace App\Domains\Shared\Calendar\Entities;

use App\Domains\Shared\Task\Entities\TaskEntity;
use Illuminate\Support\Collection;

class CalendarEntity
{
    public function __construct(
        private readonly string $date,
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
