<?php

declare(strict_types=1);

namespace App\Domains\TaskRead\Services;

// use App\Domains\TaskRead\Factories\TaskReadFactory;
use App\Domains\TaskRead\Interfaces\Services\TaskReadServiceInterface;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Http\Requests\TaskReadRequest;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\CheckIsFriends\Services\CheckIsFriendsService;
use App\Domains\TaskRead\Queries\TaskReadQuery;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskReadService implements TaskReadServiceInterface
{
    public function __construct(
        private readonly TaskReadQuery $query,
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsFriendsService $checkIsFriendsService,
        // private readonly TaskReadService $taskReadService,
        // private readonly TaskReadFactory $factory,
    ) {}

    /**
     * 累計本指名ランキング
     */
    public function taskRead(TaskReadParameter $params, TaskReadRequest $request): Collection
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        $loginInfoId = $loginInfoModel->id;
        $paramsUserId = $params->userId;

        if ($loginInfoId !== $paramsUserId) {
            $isFriends = $this->checkIsFriendsService->checkIsFriends($loginInfoId, $paramsUserId);
            if (!$isFriends) {
                // TODO このエラーも共通化
                // TODO factory？？
                throw new HttpException(403, 'このユーザは友達ではありません');
            }
        }

        $tasks = $this->query->getTasks($params)->get();

        return collect([
            'date' => $params->date,
            'tasks' => $tasks,
        ]);
    }
};
