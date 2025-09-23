<?php

namespace App\Domains\TaskSort\Parameters;

readonly class TaskSortParameter
{
    public function __construct(
        public array $ids,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            ids: $validated['ids'],
        );
    }
}
