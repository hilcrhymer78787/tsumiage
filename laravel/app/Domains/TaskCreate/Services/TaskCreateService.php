<?php

declare(strict_types=1);

namespace App\Domains\TaskCreate\Services;

use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use App\Domains\TaskCreate\Queries\TaskCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\TaskCreateRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskCreateQuery $query,
    ) {}

    public function upsertTask(TaskCreateParameter $params, TaskCreateRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;
        return empty($params->id)
            ? $this->createTask($params, $userId)
            : $this->updateTask($params, $userId);
    }

    public function createTask(TaskCreateParameter $params, int $userId): string
    {
        $this->query->createTask($params, $userId);
        return "タスクを作成しました";
    }

    public function updateTask(TaskCreateParameter $params, int $userId): string
    {
        $num = $this->query->updateTask($params, $userId);
        if (!$num) throw new HttpException(403, '更新するタスクが存在しません');
        return "タスクを更新しました";
    }
}
