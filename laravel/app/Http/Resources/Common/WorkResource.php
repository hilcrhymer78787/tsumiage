<?php


namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkResource extends JsonResource
{
    /**
     * データを配列に変換
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->getWorkId(),
            'date' => $this->resource->getWorkDate(),
            'taskId' => $this->resource->getWorkTaskId(),
            'userId' => $this->resource->getWorkUserId(),
            'state' => $this->resource->getWorkState(),
        ];
    }
}
