<?php

namespace App\Domains\InvitationCreate\Parameters;

readonly class InvitationCreateParameter
{
    public function __construct(
        public string $email,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            email: $validated['email'],
        );
    }
}
