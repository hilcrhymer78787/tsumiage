<?php

namespace App\Domains\InvitationRead\Factories;

use App\Domains\InvitationRead\Entities\InvitationReadEntity;
use App\Domains\Shared\Invitation\Factories\InvitationFactory;
use Illuminate\Support\Collection;
use App\Models\Invitation;

class InvitationReadFactory
{
    public function __construct(
        private readonly InvitationFactory $invitationFactory,
    ) {}

    public function getInvitationReadEntity(Collection $invitationReadModel): InvitationReadEntity
    {
        $fromFriendsEntity = $invitationReadModel["fromFriends"]->map(function ($invitationModel) {
            return $this->invitationFactory->create($invitationModel);
        });
        $nowFriendsEntity = $invitationReadModel["nowFriends"]->map(function ($invitationModel) {
            return $this->invitationFactory->create($invitationModel);
        });
        $toFriendsEntity = $invitationReadModel["toFriends"]->map(function ($invitationModel) {
            return $this->invitationFactory->create($invitationModel);
        });
        return new InvitationReadEntity(
            $fromFriendsEntity,
            $nowFriendsEntity,
            $toFriendsEntity,
        );
    }
}
