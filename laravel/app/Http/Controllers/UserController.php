<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{

    public function test_authentication()
    {
        return User::find(1);
    }
    public function basic_authentication(Request $request)
    {
        // ベーシック認証
        $user = User::where('email', $request['email'])->first();
        if (!$user) {
            return response()->json(['errorMessage' => 'このメールアドレスは登録されていません'], 500);
        }
        $user = User::where('email', $request['email'])
            ->where('password', $request['password'])->first();
        if (!$user) {
            return response()->json(['errorMessage' => 'パスワードが間違っています'], 500);
        }
        return $user;
    }
    public function bearer_authentication(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if (!$loginInfo) {
            return response()->json(['errorMessage' => 'このトークンは有効ではありません'], 401);
        }
        
        return $loginInfo;
    }
    public function create(Request $request)
    {
        if (!$request['id']) {
            // 重複確認
            $existEmail = User::where('email', $request['email'])->first();
            if ($existEmail) {
                return response()->json(['errorMessage' => 'このメールアドレスは既に登録されています',], 500);
            }
            // ダミータスクを作成
            // (new TaskService())->createcDummyTask($user['id']);
            // 新規ユーザー登録
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => $request['password'],
                'user_img' => $request['user_img'],
                'token' => $request['email'] . Str::random(100),
            ]);
            if ($request['file']) {
                $request['file']->storeAs('public/', $request['user_img']);
            }
            return $user;
        }

        // 編集の場合
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        if (!$loginInfo) {
            return response()->json(['errorMessage' => 'トークンが有効期限切れです'], 500);
        }
        // 重複確認
        $existEmail = User::where('email', $request['email'])->first();
        if ($existEmail && $loginInfo['email'] != $request['email']) {
            return response()->json(['errorMessage' => 'このメールアドレスは既に登録されています',], 404);
        }
        // ユーザー情報編集
        $user = User::where('id', $loginInfo['id'])->update([
            'name' => $request['name'],
            'email' => $request['email'],
            'user_img' => $request['user_img'],
        ]);
        if ($request['password']) {
            User::where('id', $request['id'])->update([
                'password' => $request['password'],
            ]);
        }
        if ($request['file']) {
            $request['file']->storeAs('public/', $request['user_img']);
        }
        if ($request['user_img'] != $request['img_oldname']) {
            Storage::delete('public/' . $request['img_oldname']);
        }
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        return $loginInfo;
    }
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByToken($request->header('token'));
        User::where('id', $loginInfo['id'])->delete();
    }
}
