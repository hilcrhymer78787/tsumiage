<?php
// TODO: 場所おかしい？

namespace App\Http\Resources\Base;

use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
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
            'message' => $this->resource,
            'success' => true,
            'status'  => 200,
        ];
    }
}
