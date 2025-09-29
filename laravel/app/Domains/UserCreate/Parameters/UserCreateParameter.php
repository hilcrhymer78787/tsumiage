<?php

namespace App\Domains\UserCreate\Parameters;

readonly class UserCreateParameter
{
    public function __construct(
        public ?string $id,
        public string $name,
        public string $email,
        public ?string $password,
        public ?string $userImg,
        public ?string $imgOldname,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            id: $validated['id'] ?? null,
            name: $validated['name'],
            email: $validated['email'],
            password: $validated['password'] ?? null,
            userImg: $validated['user_img'] ?? null,
            imgOldname: $validated['img_oldname'] ?? null,
        );
    }
}
