<?php

namespace App\Http\Resources;

use App\Http\Resources\Common\CalendarResource;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationReadResource extends JsonResource
{

    public function __construct($resource)
    {
        $this->resource = $resource;
    }
    /**
     * データを配列に変換
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $calendarEntities = $this->resource->getCalendarEntities();

        return [
            'data' => [
                'calendars'=> $calendarEntities->map(function ($calendarEntity) {
                    return (new CalendarResource($calendarEntity));
                }),
            ],
            'success' => true,
            'status' => 200,
        ];
    }
}
