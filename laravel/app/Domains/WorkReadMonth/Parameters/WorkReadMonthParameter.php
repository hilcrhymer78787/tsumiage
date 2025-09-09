<?php

namespace App\Domains\WorkReadMonth\Parameters;

readonly class WorkReadMonthParameter
{
    public function __construct(
        public int $userId,
        public int $year,
        public int $month,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            userId: $validated['user_id'],
            year: $validated['year'],
            month: $validated['month'],
        );
    }
}
