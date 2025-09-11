<?php

namespace App\Domains\InvitationRead\Factories;

use App\Domains\InvitationRead\Entities\InvitationReadEntity;
use App\Domains\Shared\Calendar\Factories\CalendarFactory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class InvitationReadFactory
{
    public function __construct(
        private readonly CalendarFactory $calendarFactory,
    ) {}

    public function create(Collection $calendarModels): InvitationReadEntity
    {
        $calendarEntities = $calendarModels->map(function ($calendarModel) {
            return $this->calendarFactory->create($calendarModel);
        });
        return new InvitationReadEntity($calendarEntities);
    }
}
