<?php

namespace App\Http\Resources;

use App\Http\Resources\Base\BaseResource;
use App\Http\Resources\Common\TaskResource;

class TaskReadResource extends BaseResource
{
    protected function resourceData($request): array
    {
        return [
            'date' => $this->resource->getDate(),
            'tasks' => TaskResource::collection(
                $this->resource->getTaskEntities()
            )
        ];
    }
}
