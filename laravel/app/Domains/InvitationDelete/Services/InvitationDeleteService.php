<?php

declare(strict_types=1);

namespace App\Domains\InvitationDelete\Services;

use App\Domains\InvitationDelete\Parameters\InvitationDeleteParameter;
use App\Domains\InvitationDelete\Queries\InvitationDeleteQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\InvitationDeleteRequest;
use App\Http\Exceptions\AppHttpException;

class InvitationDeleteService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly InvitationDeleteQuery $query,
    ) {}

    public function deleteInvitation(InvitationDeleteParameter $params, InvitationDeleteRequest $request): string
    {
        $myUserId = $this->loginInfoService->getLoginInfo($request)->id;
        $invitationId = $params->invitationId;

        $num = $this->query->deleteInvitation($invitationId, $myUserId);
        if (!$num) throw new AppHttpException(404, '招待の削除に失敗しました');

        return "招待を削除しました";
    }
}
