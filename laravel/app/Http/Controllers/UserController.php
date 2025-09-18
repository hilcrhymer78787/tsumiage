<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Work;
use App\Models\User;
use App\Models\Invitation;
use App\Services\UserService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
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
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        if (!$loginInfo) {
            return response()->json(['errorMessage' => 'トークンが有効期限切れです'], 401);
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
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        return $loginInfo;
    }
    public function delete(Request $request)
    {
        $loginInfo = (new UserService())->getLoginInfoByRequest($request);
        Task::where('task_user_id', $loginInfo['id'])->delete();
        Work::where('work_user_id', $loginInfo['id'])->delete();
        Invitation::where('invitation_to_user_id', $loginInfo['id'])->delete();
        Invitation::where('invitation_from_user_id', $loginInfo['id'])->delete();
        User::where('id', $loginInfo['id'])->delete();
    }
}
