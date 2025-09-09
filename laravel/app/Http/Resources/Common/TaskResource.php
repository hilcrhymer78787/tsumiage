<?php


namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
        $workEntity = $this->resource->getWorkEntity();
        return [
            'id' => $this->resource->getTaskId(),
            'name' => $this->resource->getTaskName(),
            'createdAt' => $this->resource->getCreatedAt(),
            'work' => new WorkResource($workEntity),
        ];
    }
}
