<?php

declare(strict_types=1);

namespace App\Domains\TaskDelete\Services;

use App\Domains\TaskDelete\Parameters\TaskDeleteParameter;
use App\Domains\TaskDelete\Queries\TaskDeleteQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\Task\Queries\TaskQuery;
use App\Http\Requests\TaskDeleteRequest;
use App\Http\Exceptions\AppHttpException;

class TaskDeleteService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskDeleteQuery $query,
        private readonly TaskQuery $taskQuery,
    ) {}

    public function deleteTask(TaskDeleteParameter $params, TaskDeleteRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;
        $taskId = $params->id;

        $taskModel = $this->taskQuery->getTaskById($taskId);
        if (!$taskModel) throw new AppHttpException(404, 'タスクが存在しません');

        $isMyTask = $userId === $taskModel->task_user_id;
        if (!$isMyTask) throw new AppHttpException(403, '自分のタスク以外を削除することはできません');

        $num = $this->query->deleteTask($taskId, $userId);
        if (!$num) throw new AppHttpException(500, 'タスクを削除できませんでした');

        $this->query->deleteWork($taskId, $userId);

        return "タスクを削除しました";
    }
}
