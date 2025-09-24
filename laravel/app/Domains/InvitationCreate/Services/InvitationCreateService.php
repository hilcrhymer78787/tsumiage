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
        $myId = $this->loginInfoService->getLoginInfo($request)->id;

        // メールアドレスが存在するか確認
        $toUser = User::where('email', $params->email)->first();
        if (!$toUser) abort(404, 'このメールアドレスは登録されていません');

        $toUserId = $toUser->id;
        $toUserName = $toUser->name;

        // 自分自身でないか確認
        $isMyself = $toUserId == $myId;
        if ($isMyself) abort(400, '自分自身に友達申請することはできません');

        // 重複判定
        $nowJudgment = Invitation::where('invitation_from_user_id', $myId)
            ->where('invitation_to_user_id', $toUserId)
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) abort(409, $toUserName . 'さんにはすでに友達です');

        $nowJudgment = Invitation::where('invitation_to_user_id', $myId)
            ->where('invitation_from_user_id', $toUserId)
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) abort(409, $toUserName . 'さんにはすでに友達です');

        $toJudgment = Invitation::where('invitation_from_user_id', $myId)
            ->where('invitation_to_user_id', $toUserId)
            ->where('invitation_status', 1)
            ->first();
        if ($toJudgment) abort(409, $toUserName . 'さんにはすでに友達申請をしています');

        $fromJudgment = Invitation::where('invitation_to_user_id', $myId)
            ->where('invitation_from_user_id', $toUserId)
            ->where('invitation_status', 1)
            ->first();
        if ($fromJudgment) abort(409, $toUserName . 'さんからの友達申請が来ているため許可してください');

        Invitation::create([
            'invitation_from_user_id' => $myId,
            'invitation_to_user_id' => $toUserId,
            'invitation_status' => 1,
        ]);

        return $toUserName . 'さんに友達申請しました';


        // $taskId = $params->id;

        // if($taskId){
        //     $isExistMyInvitation = $this->query->getIsExistMyInvitation($taskId, $userId);
        //     if (!$isExistMyInvitation) abort(404, '更新するタスクが存在しません');
        // }
        // $this->query->updateOrCreateInvitation($params, $userId);

        // return "タスクを" . ($taskId ? "更新" : "作成") . "しました";
    }
}
