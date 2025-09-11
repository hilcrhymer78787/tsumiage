<?php

namespace App\Domains\Shared\Invitation\Entities;

class InvitationEntity
{
    public function __construct(
        private readonly int $id,
        private readonly string $email,
        private readonly string $name,
        private readonly string $userImg,
        private readonly int $invitationId,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getUserImg(): string
    {
        return $this->userImg;
    }

    public function getInvitationId(): int
    {
        return $this->invitationId;
    }
}