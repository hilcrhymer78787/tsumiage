<?php

declare(strict_types=1);

namespace App\Domains\TaskDelete\Services;

use App\Domains\TaskDelete\Parameters\TaskDeleteParameter;
use App\Domains\TaskDelete\Queries\TaskDeleteQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\TaskDeleteRequest;

class TaskDeleteService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskDeleteQuery $query,
    ) {}

    public function deleteTask(TaskDeleteParameter $params, TaskDeleteRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;
        $taskId = $params->id;

        $num = $this->query->deleteTask($taskId, $userId);
        if (!$num) abort(404, 'タスクが存在しません');

        $this->query->deleteWork($taskId, $userId);
        
        return "タスクを削除しました";
    }
}
