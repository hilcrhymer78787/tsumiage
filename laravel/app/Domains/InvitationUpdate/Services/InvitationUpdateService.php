<?php

declare(strict_types=1);

namespace App\Domains\InvitationUpdate\Services;

use App\Domains\InvitationUpdate\Parameters\InvitationUpdateParameter;
use App\Domains\InvitationUpdate\Queries\InvitationUpdateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\InvitationUpdateRequest;
use App\Http\Exceptions\AppHttpException;

class InvitationUpdateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly InvitationUpdateQuery $query,
    ) {}

    public function updateInvitation(InvitationUpdateParameter $params, InvitationUpdateRequest $request): string
    {
        $myUserId = $this->loginInfoService->getLoginInfo($request)->id;
        $invitationId = $params->invitationId;

        $invitationModel = $this->query->getInvitation($invitationId, $myUserId);
        if (!$invitationModel) throw new AppHttpException(404, '招待されていません');

        $fromUserId = $invitationModel->invitation_from_user_id;
        $fromUserModel = $this->query->getUserById($fromUserId);
        if (!$fromUserModel) throw new AppHttpException(404, '招待したユーザーは存在しません');

        $num = $this->query->updateInvitation($invitationId, $myUserId);
        if (!$num) throw new AppHttpException(404, '招待を受け入れることに失敗しました');

        $fromUserName = $fromUserModel->name;
        return $fromUserName . "さんからの招待を受け入れました";
    }
}
