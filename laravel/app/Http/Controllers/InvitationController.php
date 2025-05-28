<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\User;

use App\Services\UserService;

class InvitationController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        $return['fromFriends'] = (new UserService())->getFromFriends($loginInfo['id']);
        $return['nowFriends'] = (new UserService())->getNowFriends($loginInfo['id']);
        $return['toFriends'] = (new UserService())->getToFriends($loginInfo['id']);
        return $return;
    }
    public function create(Request $request)
    {
        // メールアドレスが存在するか確認
        $toUserData = User::where('email', $request['email'])->first();
        if (!$toUserData) {
            return response()->json(['errorMessage' => 'このメールアドレスは登録されていません'], 500);
        }

        $loginInfo = (new UserService())->getLoginInfoByRequest($request);

        // 自分自身でないか確認
        if ($toUserData['id'] == $loginInfo['id']) {
            $errorMessage = '自分自身に友達申請することはできません';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        // 重複判定
        $nowJudgment = Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_to_user_id', $toUserData['id'])
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) {
            $errorMessage = $toUserData['name'] . 'さんにはすでに友達です';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        // 重複判定
        $nowJudgment = Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_from_user_id', $toUserData['id'])
            ->where('invitation_status', 2)
            ->first();
        if ($nowJudgment) {
            $errorMessage = $toUserData['name'] . 'さんにはすでに友達です';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        // 重複判定
        $toJudgment = Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_to_user_id', $toUserData['id'])
            ->where('invitation_status', 1)
            ->first();
        if ($toJudgment) {
            $errorMessage = $toUserData['name'] . 'さんにはすでに友達申請をしています';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        // 重複判定
        $fromJudgment = Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_from_user_id', $toUserData['id'])
            ->where('invitation_status', 1)
            ->first();
        if ($fromJudgment) {
            $errorMessage = $toUserData['name'] . 'さんからの友達申請が来ているため許可してください';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        Invitation::create([
            'invitation_from_user_id' => $loginInfo['id'],
            'invitation_to_user_id' => $toUserData['id'],
            'invitation_status' => 1,
        ]);

        $return['successMessage'] = $toUserData['name'] . 'さんに友達申請しました';
        return $return;
    }
    public function update(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        // 判定
        $judge = Invitation::where('invitation_id', $request['invitation_id'])
            ->where('invitation_to_user_id', $loginInfo['id'])
            ->first();
        if (!$judge) {
            return response()->json(['errorMessage' => '招待されていません'], 500);
        }
        Invitation::where('invitation_id', $request['invitation_id'])->update([
            'invitation_status' => 2,
        ]);
    }
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_id', $request['invitation_id'])
            ->delete();
        Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_id', $request['invitation_id'])
            ->delete();
    }
}
