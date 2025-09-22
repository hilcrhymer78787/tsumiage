<?php

namespace App\Http\Resources;

use App\Http\Resources\Common\CalendarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkReadMonthResource extends JsonResource
{
    /**
     * データを配列に変換
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'data' => [
                'calendars' => CalendarResource::collection(
                    $this->resource->getCalendarEntities()
                ),
            ],
            'success' => true,
            'status' => 200,
        ];
    }
}
