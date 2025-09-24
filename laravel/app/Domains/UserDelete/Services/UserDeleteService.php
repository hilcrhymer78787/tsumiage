<?php

declare(strict_types=1);

namespace App\Domains\UserDelete\Services;

use App\Domains\Shared\CheckIsExistEmail\Services\CheckIsExistEmailService;
use App\Domains\Shared\Invitation\Queries\InvitationQuery;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\UserDelete\Queries\UserDeleteQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Domains\Shared\Task\Queries\TaskQuery;
use App\Domains\Shared\Work\Queries\WorkQuery;
use Illuminate\Foundation\Http\FormRequest;

class UserDeleteService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsExistEmailService $checkIsExistEmailService,
        private readonly UserDeleteQuery $query,
        private readonly TaskQuery $taskQuery,
        private readonly WorkQuery $workQuery,
        private readonly InvitationQuery $invitationQuery,
    ) {}

    public function getLoginInfoEntity(FormRequest $request): LoginInfoEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);

        $userId = $loginInfoModel->id;
        $this->query->deleteUser($userId);
        $this->taskQuery->deleteTaskByUserId($userId);
        $this->workQuery->deleteWorkByUserId($userId);
        $this->invitationQuery->deleteInvitationByUserId($userId);

        return new LoginInfoEntity(
            id: $userId,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
}
