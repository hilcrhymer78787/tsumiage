<?php

namespace App\Domains\Shared\Work\Entities;

class WorkEntity
{
    public function __construct(
        private readonly int $workId,
        private readonly string $workDate,
        private readonly int $workTaskId,
        private readonly int $workUserId,
        private readonly int $workState,
    ) {}

    public function getWorkId(): int
    {
        return $this->workId;
    }

    public function getWorkDate(): string
    {
        return $this->workDate;
    }

    public function getWorkTaskId(): int
    {
        return $this->workTaskId;
    }

    public function getWorkUserId(): int
    {
        return $this->workUserId;
    }

    public function getWorkState(): int
    {
        return $this->workState;
    }
}
