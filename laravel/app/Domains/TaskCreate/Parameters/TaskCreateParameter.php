<?php

namespace App\Domains\TaskCreate\Parameters;

readonly class TaskCreateParameter
{
    public function __construct(
        public ?int $id,
        public string $name,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            id: $validated['id'] ?? null,
            name: $validated['name'],
        );
    }
}
