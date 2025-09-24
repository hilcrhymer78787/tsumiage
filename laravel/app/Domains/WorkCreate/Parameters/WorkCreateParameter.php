<?php

namespace App\Domains\WorkCreate\Parameters;

readonly class WorkCreateParameter
{
    public function __construct(
        public int $state,
        public string $date,
        public int $taskId,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            state: $validated['state'],
            date: $validated['date'],
            taskId: $validated['task_id'],
        );
    }
}
