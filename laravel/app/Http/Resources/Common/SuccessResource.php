<?php

namespace App\Http\Resources\Common;

use App\Http\Resources\Base\BaseResource;

class SuccessResource extends BaseResource
{
    public function resourceData($request): array
    {
        return [
            'message' => $this->resource,
        ];
    }
}
