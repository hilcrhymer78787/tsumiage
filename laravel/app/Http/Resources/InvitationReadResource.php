<?php

namespace App\Http\Resources;

use App\Http\Resources\Base\BaseResource;
use App\Http\Resources\Common\InvitationResource;

class InvitationReadResource extends BaseResource
{
    public function resourceData($request): array
    {
        return [
            'fromFriends' => InvitationResource::collection(
                $this->resource->getFromFriendsEntity()
            ),
            'nowFriends' => InvitationResource::collection(
                $this->resource->getNowFriendsEntity()
            ),
            'toFriends' => InvitationResource::collection(
                $this->resource->getToFriendsEntity()
            ),
        ];
    }
}
