<?php


namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
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
            'user_img' => $this->resource->getUserImg(),
            'invitation_id' => $this->resource->getInvitationId(),
        ];
    }
}
