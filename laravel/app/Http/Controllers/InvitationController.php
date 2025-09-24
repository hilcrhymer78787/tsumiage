<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\User;

use App\Services\UserService;

class InvitationController extends Controller
{
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
