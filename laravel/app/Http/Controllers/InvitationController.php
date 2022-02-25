<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\Room;
use App\Models\User;

use App\Services\UserService;

class InvitationController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
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

        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        $roomData = Room::where('room_id', $loginInfo['user_room_id'])->first();

        // 重複判定
        $duplicateJudgment = Invitation::where('invitation_room_id', $loginInfo['user_room_id'])
            ->where('invitation_to_user_id', $toUserData['id'])
            ->first();
        if ($duplicateJudgment) {
            $errorMessage = $toUserData['name'] . 'さんはすでに' . $roomData['room_name'] . 'へ招待されています';
            return response()->json(['errorMessage' => $errorMessage], 500);
        }

        Invitation::create([
            'invitation_room_id' => $loginInfo['user_room_id'],
            'invitation_from_user_id' => $loginInfo['id'],
            'invitation_to_user_id' => $toUserData['id'],
            'invitation_status' => 0,
        ]);

        $return['successMessage'] = $toUserData['name'] . 'さんを' . $roomData['room_name'] . 'へ招待しました';
        return $return;
    }
    public function update(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
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
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        Invitation::where('invitation_to_user_id', $loginInfo['id'])
            ->where('invitation_id', $request['invitation_id'])
            ->delete();
        Invitation::where('invitation_from_user_id', $loginInfo['id'])
            ->where('invitation_id', $request['invitation_id'])
            ->delete();
    }
}
