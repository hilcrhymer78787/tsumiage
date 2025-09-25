<?php

declare(strict_types=1);

namespace App\Domains\TaskCreate\Services;

use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use App\Domains\TaskCreate\Queries\TaskCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Exceptions\AppHttpException;

class TaskCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskCreateQuery $query,
    ) {}

    public function updateOrCreateTask(TaskCreateParameter $params, TaskCreateRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;
        $taskId = $params->id;

        if($taskId){
            $isExistMyTask = $this->query->getIsExistMyTask($taskId, $userId);
            if (!$isExistMyTask) throw new AppHttpException(404, '更新するタスクが存在しません');
        }
        $this->query->updateOrCreateTask($params, $userId);
        
        return "タスクを" . ($taskId ? "更新" : "作成") . "しました";
    }
}
