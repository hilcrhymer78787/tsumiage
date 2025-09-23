<?php

declare(strict_types=1);

namespace App\Domains\TaskDelete\Services;

use App\Domains\TaskDelete\Parameters\TaskDeleteParameter;
use App\Domains\TaskDelete\Queries\TaskDeleteQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\TaskDeleteRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskDeleteService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskDeleteQuery $query,
    ) {}

    public function deleteTask(TaskDeleteParameter $params, TaskDeleteRequest $request): string
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        if (!$loginInfoModel) throw new HttpException(401, 'トークンが有効期限切れです');

        $userId = $loginInfoModel->id;
        $taskId = $params->id;

        $this->query->deleteTask($taskId, $userId);
        $this->query->deleteWork($taskId, $userId);
        
        return "タスクを削除しました";
    }
}
