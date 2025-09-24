<?php

declare(strict_types=1);

namespace App\Domains\InvitationCreate\Services;

use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Domains\InvitationCreate\Queries\InvitationCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\InvitationCreateRequest;
use App\Models\Invitation;
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
        if (!$targetUser) abort(404, 'このメールアドレスは登録されていません');

        $targetUserId = $targetUser->id;
        $targetUserName = $targetUser->name;

        // 自分自身でないか確認
        if ($targetUserId === $myUserId) abort(400, '自分自身に友達申請することはできません');

        // すでに友達か確認（自分→相手）
        $existingFriend1 = Invitation::where('invitation_from_user_id', $myUserId)
            ->where('invitation_to_user_id', $targetUserId)
            ->where('invitation_status', 2)
            ->first();
        if ($existingFriend1) abort(409, $targetUserName . 'さんにはすでに友達です');

        // すでに友達か確認（相手→自分）
        $existingFriend2 = Invitation::where('invitation_to_user_id', $myUserId)
            ->where('invitation_from_user_id', $targetUserId)
            ->where('invitation_status', 2)
            ->first();
        if ($existingFriend2) abort(409, $targetUserName . 'さんにはすでに友達です');

        // すでに申請済みか確認（自分→相手）
        $existingRequest1 = Invitation::where('invitation_from_user_id', $myUserId)
            ->where('invitation_to_user_id', $targetUserId)
            ->where('invitation_status', 1)
            ->first();
        if ($existingRequest1) abort(409, $targetUserName . 'さんにはすでに友達申請をしています');

        // すでに相手から申請が来ているか確認
        $existingRequest2 = Invitation::where('invitation_to_user_id', $myUserId)
            ->where('invitation_from_user_id', $targetUserId)
            ->where('invitation_status', 1)
            ->first();
        if ($existingRequest2) abort(409, $targetUserName . 'さんからの友達申請が来ているため許可してください');

        Invitation::create([
            'invitation_from_user_id' => $myUserId,
            'invitation_to_user_id' => $targetUserId,
            'invitation_status' => 1,
        ]);

        return $targetUserName . 'さんに友達申請しました';


        // $taskId = $params->id;

        // if($taskId){
        //     $isExistMyInvitation = $this->query->getIsExistMyInvitation($taskId, $userId);
        //     if (!$isExistMyInvitation) abort(404, '更新するタスクが存在しません');
        // }
        // $this->query->updateOrCreateInvitation($params, $userId);

        // return "タスクを" . ($taskId ? "更新" : "作成") . "しました";
    }
}
