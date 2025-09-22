<?php

declare(strict_types=1);

namespace App\Domains\TaskRead\Services;

use App\Domains\TaskRead\Factories\TaskReadFactory;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Http\Requests\TaskReadRequest;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\CheckIsFriends\Services\CheckIsFriendsService;
use App\Domains\TaskRead\Entities\TaskReadEntity;
use App\Domains\TaskRead\Queries\TaskReadQuery;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskReadService
{
    public function __construct(
        private readonly TaskReadQuery $query,
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsFriendsService $checkIsFriendsService,
        private readonly TaskReadFactory $factory,
    ) {}

    public function taskRead(TaskReadParameter $params, TaskReadRequest $request): TaskReadEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        $loginInfoId = $loginInfoModel->id;
        $paramsUserId = $params->userId;
        $paramsDate = $params->date;

        if ($loginInfoId !== $paramsUserId) {
            $isFriends = $this->checkIsFriendsService->checkIsFriends($loginInfoId, $paramsUserId);
            if (!$isFriends) throw new HttpException(403, 'このユーザは友達ではありません');
        }

        $taskModels = $this->query->getTasksBuilder($params)->get();
        
        return $this->factory->create($paramsDate, $taskModels);
    }
};
