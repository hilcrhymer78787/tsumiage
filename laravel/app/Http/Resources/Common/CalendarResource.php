<?php


namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;

class CalendarResource extends JsonResource
{
    /**
     * データを配列に変換
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $taskEntities = $this->resource->getTaskEntities();

        return [
            'date' => $this->resource->getDate(),
            'tasks' => $taskEntities->map(function ($taskEntity) {
                return (new TaskResource($taskEntity));
            }),
        ];
    }
}
