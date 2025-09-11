<?php

namespace App\Domains\Shared\Invitation\Factories;


use App\Domains\Shared\Invitation\Entities\InvitationEntity;
use App\Domains\Shared\Work\Factories\WorkFactory;
use Illuminate\Support\Collection;
use App\Models\Invitation;

class InvitationFactory
{
    public function create(Invitation $invitationModel): InvitationEntity
    {            
        return new InvitationEntity(
            id: $invitationModel->id,
            email: $invitationModel->email,
            name: $invitationModel->name,
            userImg: $invitationModel->user_img,
            invitationId: $invitationModel->invitation_id,
        );
    }
}
