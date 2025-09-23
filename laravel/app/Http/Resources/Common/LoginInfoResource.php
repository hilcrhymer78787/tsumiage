<?php


namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginInfoResource extends JsonResource
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
            'id' => $this->resource->getId(),
            'email' => $this->resource->getEmail(),
            'name' => $this->resource->getName(),
            'token' => $this->resource->getToken(),
            'user_img' => $this->resource->getUserImg(),
        ];
    }
}
