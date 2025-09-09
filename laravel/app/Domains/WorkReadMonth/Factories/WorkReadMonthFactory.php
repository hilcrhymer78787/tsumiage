<?php

namespace App\Domains\WorkReadMonth\Factories;

use App\Domains\WorkReadMonth\Entities\WorkReadMonthEntity;
use App\Domains\Shared\Calendar\Factories\CalendarFactory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class WorkReadMonthFactory
{
    public function __construct(
        private readonly CalendarFactory $calendarFactory,
    ) {}

    public function create(Collection $calendarModels): WorkReadMonthEntity
    {
        $calendarEntities = $calendarModels->map(function ($calendarModel) {
            return $this->calendarFactory->create($calendarModel);
        });
        return new WorkReadMonthEntity($calendarEntities);
    }
}
