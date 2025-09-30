<?php

namespace App\Domains\Shared\LoginInfo\Entities;

class LoginInfoEntity
{
    public function __construct(
        private readonly int $id,
        private readonly string $email,
        private readonly string $name,
        private readonly string $token,
        private readonly ?string $userImg
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

    public function getToken(): string
    {
        return $this->token;
    }

    public function getUserImg(): ?string
    {
        return $this->userImg;
    }
}
