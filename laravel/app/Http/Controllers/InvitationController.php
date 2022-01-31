<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\Room;
use App\Models\User;

use App\Services\UserService;

class InvitationController extends Controller
{
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
        // ルームに参加
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        Invitation::where('invitation_id', $request['invitation_id'])->update([
            'invitation_status' => 2,
        ]);

        // ルームに入室
        $invitation = Invitation::where('invitation_id', $request['invitation_id'])->first();
        User::where('id', $loginInfo['id'])->update([
            'user_room_id' => $invitation['invitation_room_id'],
        ]);
    }
    public function delete(Request $request)
    {
        Invitation::where('invitation_id', $request['invitation_id'])
            ->delete();
    }
}
