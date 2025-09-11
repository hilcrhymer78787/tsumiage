<?php

namespace App\Domains\InvitationRead\Entities;

use Illuminate\Support\Collection;

class InvitationReadEntity
{
    public function __construct(
        private readonly Collection $fromFriendsEntity,
        private readonly Collection $nowFriendsEntity,
        private readonly Collection $toFriendsEntity,
    ) {}

    public function getFromFriendsEntity(): Collection
    {
        return $this->fromFriendsEntity;
    }

    public function getNowFriendsEntity(): Collection
    {
        return $this->nowFriendsEntity;
    }

    public function getToFriendsEntity(): Collection
    {
        return $this->toFriendsEntity;
    }

}
