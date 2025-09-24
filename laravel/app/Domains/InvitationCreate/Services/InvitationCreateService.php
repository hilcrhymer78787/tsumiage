<?php

declare(strict_types=1);

namespace App\Domains\InvitationCreate\Services;

use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Domains\InvitationCreate\Queries\InvitationCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\InvitationCreateRequest;
use App\Models\Invitation;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\HttpException;

class InvitationCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly InvitationCreateQuery $query,
    ) {}

    public function updateOrCreateInvitation(InvitationCreateParameter $params, InvitationCreateRequest $request): string
    {
        $loginInfo = $this->loginInfoService->getLoginInfo($request);


        // メールアドレスが存在するか確認
        $toUserData = User::where('email', $request['email'])->first();
        if (!$toUserData) abort(500, 'このメールアドレスは登録されていません');

        // 自分自身でないか確認
        if ($toUserData['id'] == $loginInfo['id']) abort(500, '自分自身に友達申請することはできません');

        // 重複判定
        $nowJudgment = Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_to_user_id', $toUserData['id'])
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) abort(500, $toUserData['name'] . 'さんにはすでに友達です');


        // 重複判定
        $nowJudgment = Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_from_user_id', $toUserData['id'])
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) abort(500, $toUserData['name'] . 'さんにはすでに友達です');


        // 重複判定
        $toJudgment = Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_to_user_id', $toUserData['id'])
            ->where('invitation_status', 1)
            ->first();
        if ($toJudgment) abort(500, $toUserData['name'] . 'さんにはすでに友達申請をしています');

        // 重複判定
        $fromJudgment = Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_from_user_id', $toUserData['id'])
            ->where('invitation_status', 1)
            ->first();
        if ($fromJudgment) abort(500, $toUserData['name'] . 'さんからの友達申請が来ているため許可してください');

        Invitation::create([
            'invitation_from_user_id' => $loginInfo['id'],
            'invitation_to_user_id' => $toUserData['id'],
            'invitation_status' => 1,
        ]);

        return $toUserData['name'] . 'さんに友達申請しました';


        // $taskId = $params->id;

        // if($taskId){
        //     $isExistMyInvitation = $this->query->getIsExistMyInvitation($taskId, $userId);
        //     if (!$isExistMyInvitation) abort(404, '更新するタスクが存在しません');
        // }
        // $this->query->updateOrCreateInvitation($params, $userId);

        // return "タスクを" . ($taskId ? "更新" : "作成") . "しました";
    }
}
