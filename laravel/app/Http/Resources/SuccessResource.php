<?php
// TODO: 場所おかしい？

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'message' => $this->resource,
            'success' => true,
            'status'  => 200,
        ];
    }
}
