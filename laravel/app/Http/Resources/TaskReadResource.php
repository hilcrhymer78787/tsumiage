<?php

namespace App\Http\Resources;

use App\Http\Resources\Common\TaskResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class TaskReadResource extends JsonResource
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
        $taskEntities = $this->resource->getTaskEntities();

        return [
            'data' => [
                'date' => $this->resource->getDate(),
                'tasks' => $taskEntities->map(function ($taskEntity) {
                    return (new TaskResource($taskEntity));
                }),
            ],
            'success' => true,
            'status' => 200,
        ];
    }
}
