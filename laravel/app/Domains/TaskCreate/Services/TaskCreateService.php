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

    public function upsertTask(TaskCreateParameter $params, TaskCreateRequest $request)
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        if (!$loginInfoModel) {
            throw new HttpException(401, 'トークンが有効期限切れです');
        }

        $userId = $loginInfoModel->id;
        empty($params->id)
            ? $this->query->createTask($params, $userId)
            : $this->query->updateTask($params, $userId);
        return;
    }
}
