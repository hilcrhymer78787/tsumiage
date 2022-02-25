<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;

class FriendController extends Controller
{
    public function read(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        $return['fromFriends'] = (new UserService())->getFromFriends($loginInfo['id']);
        $return['nowFriends'] = (new UserService())->getNowFriends($loginInfo['id']);
        $return['toFriends'] = (new UserService())->getToFriends($loginInfo['id']);

        return $return;
    }
}
