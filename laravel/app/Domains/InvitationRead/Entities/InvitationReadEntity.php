<?php

namespace App\Domains\InvitationRead\Entities;

use Illuminate\Support\Collection;

class InvitationReadEntity
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
