<?php

namespace App\Domains\AuthBasic\Parameters;

readonly class AuthBasicParameter
{
    public function __construct(
        public string $email,
        public string $password,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            email: $validated['email'],
            password: $validated['password'],
        );
    }
}
