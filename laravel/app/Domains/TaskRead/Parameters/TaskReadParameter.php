<?php

namespace App\Domains\TaskRead\Parameters;

readonly class TaskReadParameter
{
    public function __construct(
        public int $userId,
        public string $date,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            userId: $validated['user_id'],
            date: $validated['date'],
        );
    }
}
