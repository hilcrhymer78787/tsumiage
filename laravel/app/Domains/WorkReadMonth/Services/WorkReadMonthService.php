<?php

declare(strict_types=1);

namespace App\Domains\WorkReadMonth\Services;

use App\Domains\WorkReadMonth\Factories\WorkReadMonthFactory;
use App\Domains\WorkReadMonth\Parameters\WorkReadMonthParameter;
use App\Http\Requests\WorkReadMonthRequest;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\CheckIsFriends\Services\CheckIsFriendsService;
use App\Http\Exceptions\AppHttpException;
use App\Domains\Shared\Task\Queries\TaskQuery;
use App\Domains\Shared\Work\Queries\WorkQuery;
use App\Domains\WorkReadMonth\Entities\WorkReadMonthEntity;

class WorkReadMonthService
{
    public function __construct(
        private readonly TaskQuery $taskQuery,
        private readonly WorkQuery $workQuery,
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsFriendsService $checkIsFriendsService,
        private readonly WorkReadMonthFactory $factory,
        private readonly WorkReadMonthBuilder $builder,
    ) {}

    public function workReadMonth(WorkReadMonthParameter $params, WorkReadMonthRequest $request): WorkReadMonthEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        $loginInfoId = $loginInfoModel->id;
        $paramsUserId = $params->userId;
        $paramsYear = $params->year;
        $paramsMonth = $params->month;

        if ($loginInfoId !== $paramsUserId) {
            $isFriends = $this->checkIsFriendsService->checkIsFriends($loginInfoId, $paramsUserId);
            if (!$isFriends) throw new AppHttpException(403, 'このユーザは友達ではありません');
        }

        $taskModels = $this->taskQuery->getTasks($paramsUserId);

        $workModels = $this->workQuery->getWorksBuilder($paramsUserId, $paramsYear, $paramsMonth)->get();

        $calendarModels = $this->builder->build($paramsYear, $paramsMonth, $taskModels, $workModels);

        return $this->factory->create($calendarModels);
    }
};
