<?php

declare(strict_types=1);

namespace App\Domains\InvitationRead\Services;

use App\Domains\InvitationRead\Factories\InvitationReadFactory;
use App\Domains\InvitationRead\Parameters\InvitationReadParameter;
use App\Http\Requests\InvitationReadRequest;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\CheckIsFriends\Services\CheckIsFriendsService;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Domains\Shared\Task\Queries\TaskQuery;
use App\Domains\Shared\Work\Queries\WorkQuery;
use App\Domains\InvitationRead\Entities\InvitationReadEntity;
use App\Domains\InvitationRead\Queries\InvitationReadQuery;

class InvitationReadService
{
    public function __construct(
        private readonly InvitationReadQuery $invitationReadQuery,
        private readonly WorkQuery $workQuery,
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsFriendsService $checkIsFriendsService,
        private readonly InvitationReadFactory $factory,
        private readonly InvitationReadBuilder $builder,
    ) {}

    public function invitationRead(InvitationReadRequest $request): InvitationReadEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        $loginInfoId = $loginInfoModel->id;

        $fromFriendModels = $this->invitationReadQuery->getFromFriendsBuilder($loginInfoId)->get();
        $nowFriendModels = $this->invitationReadQuery->getNowFriendsBuilder($loginInfoId)->get();
        $toFriendModels = $this->invitationReadQuery->getToFriendsBuilder($loginInfoId)->get();

        $invitationReadModel = $this->builder->build($fromFriendModels, $nowFriendModels, $toFriendModels);

        return $this->factory->getInvitationReadEntity($invitationReadModel);
    }
};
