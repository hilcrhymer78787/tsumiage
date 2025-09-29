<?php

declare(strict_types=1);

namespace App\Domains\InvitationRead\Services;

use App\Domains\InvitationRead\Factories\InvitationReadFactory;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\CheckIsFriends\Services\CheckIsFriendsService;
use App\Domains\Shared\Work\Queries\WorkQuery;
use App\Domains\InvitationRead\Entities\InvitationReadEntity;
use App\Domains\InvitationRead\Queries\InvitationReadQuery;
use Illuminate\Foundation\Http\FormRequest;

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

    public function invitationRead(FormRequest $request): InvitationReadEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        $loginInfoId = $loginInfoModel->id;

        $fromFriendModels = $this->invitationReadQuery->getFromFriends($loginInfoId);
        $nowFriendModels = $this->invitationReadQuery->getNowFriends($loginInfoId);
        $toFriendModels = $this->invitationReadQuery->getToFriends($loginInfoId);

        $invitationReadModel = $this->builder->build($fromFriendModels, $nowFriendModels, $toFriendModels);

        return $this->factory->getInvitationReadEntity($invitationReadModel);
    }
};
