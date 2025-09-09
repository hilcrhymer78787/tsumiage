<?php

namespace App\Domains\Shared\Task\Entities;

use App\Domains\Shared\Work\Entities\WorkEntity;

class TaskEntity
{
    public function __construct(
        private readonly int $taskId,
        private readonly string $taskName,
        private readonly string $createdAt,
        private readonly ?int $taskSortKey,
        private readonly WorkEntity $workEntity,
    ) {}

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getTaskName(): string
    {
        return $this->taskName;
    }

    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    public function getWorkEntity(): WorkEntity
    {
        return $this->workEntity;
    }
}
