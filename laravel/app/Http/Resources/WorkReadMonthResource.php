<?php

namespace App\Http\Resources;

use App\Http\Resources\Base\BaseResource;
use App\Http\Resources\Common\CalendarResource;

class WorkReadMonthResource extends BaseResource
{
    protected function resourceData($request): array
    {
        return [
            'calendars' => CalendarResource::collection(
                $this->resource->getCalendarEntities()
            ),
        ];
    }
}
