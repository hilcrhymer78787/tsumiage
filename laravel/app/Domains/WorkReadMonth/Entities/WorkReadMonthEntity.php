<?php

namespace App\Domains\WorkReadMonth\Entities;

use Illuminate\Support\Collection;

class WorkReadMonthEntity
{
    public function __construct(
        /** @var Collection<int, CalendarEntity> */
        private readonly Collection $calendarEntities,
    ) {}

    public function getCalendarEntities(): Collection
    {
        return $this->calendarEntities;
    }

}
