<?php

namespace App\Domains\TaskDelete\Parameters;

readonly class TaskDeleteParameter
{
    public function __construct(
        public int $id,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            id: $validated['id'],
        );
    }
}
