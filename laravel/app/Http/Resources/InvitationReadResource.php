<?php

namespace App\Http\Resources;

use App\Http\Resources\Common\InvitationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationReadResource extends JsonResource
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
        $fromFriendsEntity = $this->resource->getFromFriendsEntity();
        $nowFriendsEntity = $this->resource->getNowFriendsEntity();
        $toFriendsEntity = $this->resource->getToFriendsEntity();

        return [
            'data' => [
                'fromFriends'=> $fromFriendsEntity->map(function ($invitationEntity) {
                    return (new InvitationResource($invitationEntity));
                }),
                'nowFriends'=> $nowFriendsEntity->map(function ($invitationEntity) {
                    return (new InvitationResource($invitationEntity));
                }),
                'toFriends'=> $toFriendsEntity->map(function ($invitationEntity) {
                    return (new InvitationResource($invitationEntity));
                }),
            ],
            'success' => true,
            'status' => 200,
        ];
    }
}
