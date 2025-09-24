<?php

declare(strict_types=1);

namespace App\Domains\TaskSort\Services;

use App\Domains\TaskSort\Parameters\TaskSortParameter;
use App\Domains\TaskSort\Queries\TaskSortQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\TaskSortRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskSortService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly TaskSortQuery $query,
    ) {}

    public function sortTask(TaskSortParameter $params, TaskSortRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;
        $taskIds = $params->ids;

        $this->query->sortTask($taskIds, $userId);
        
        return "タスクの順番を変更しました";
    }
}
