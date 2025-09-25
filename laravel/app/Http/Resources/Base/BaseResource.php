<?php

namespace App\Http\Resources\Base;

use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseResource extends JsonResource
{
    /**
     * レスポンスの共通ラッパー
     */
    public function toArray($request): array
    {
        return [
            'data'    => $this->resourceData($request),
            'status'  => 200,
        ];
    }

    /**
     * 各リソースが実装すべきデータ部分
     */
    abstract protected function resourceData($request): array;
}
