<?php

declare(strict_types=1);

namespace App\Domains\WorkCreate\Services;

use App\Domains\WorkCreate\Parameters\WorkCreateParameter;
use App\Domains\WorkCreate\Queries\WorkCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\WorkCreateRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class WorkCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly WorkCreateQuery $query,
    ) {}

    public function updateOrCreateWork(WorkCreateParameter $params, WorkCreateRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;

        $isExistMyTask = $this->query->getIsExistMyTask($params->taskId, $userId);
        if (!$isExistMyTask) abort(403, '自分のタスク以外は更新できません');

        $this->query->updateOrCreateWork($params, $userId);

        return "活動情報を更新しました";
    }
}
