<?php

declare(strict_types=1);

namespace App\Domains\InvitationCreate\Services;

use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Domains\InvitationCreate\Queries\InvitationCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\InvitationCreateRequest;
use App\Http\Exceptions\AppHttpException;
use App\Models\User;

class InvitationCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly InvitationCreateQuery $query,
    ) {}

    public function updateOrCreateInvitation(InvitationCreateParameter $params, InvitationCreateRequest $request): string
    {
        $myUserId = $this->loginInfoService->getLoginInfo($request)->id;

        // メールアドレスが存在するか確認
        $targetUser = User::where('email', $params->email)->first();
        if (!$targetUser) throw new AppHttpException(404, 'このメールアドレスは登録されていません');

        $targetUserId = $targetUser->id;
        $targetUserName = $targetUser->name;

        // 自分自身でないか確認
        if ($targetUserId === $myUserId) throw new AppHttpException(400, '自分自身に友達申請することはできません');

        // すでに友達か確認
        $isAlreadyFriend = $this->query->getIsAlreadyFriend($myUserId, $targetUserId);
        if ($isAlreadyFriend) throw new AppHttpException(409, $targetUserName . 'さんにはすでに友達です');

        // すでに申請済みか確認（自分→相手）
        $isAlreadySentRequest = $this->query->getIsAlreadySentRequest($myUserId, $targetUserId);
        if ($isAlreadySentRequest) throw new AppHttpException(409, $targetUserName . 'さんにはすでに友達申請をしています');

        // すでに相手から申請が来ているか確認
        $isAlreadyReceivedRequest = $this->query->getIsAlreadyReceivedRequest($myUserId, $targetUserId);
        if ($isAlreadyReceivedRequest) throw new AppHttpException(409, $targetUserName . 'さんからの友達申請が来ているため許可してください');

        $this->query->createInvitation($myUserId, $targetUserId);

        return $targetUserName . 'さんに友達申請しました';
    }
}
