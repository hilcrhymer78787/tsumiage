<?php

declare(strict_types=1);

namespace App\Domains\UserCreate\Services;

use App\Domains\UserCreate\Parameters\UserCreateParameter;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\UserCreate\Queries\UserCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Services\UserService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UserCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly UserCreateQuery $query,
    ) {}

    public function getLoginInfoEntity(UserCreateParameter $params, UserCreateRequest $request): LoginInfoEntity
    {
        // $loginInfoModel = $this->query->getLoginInfoModel($params);

        if (!$request['id']) {
            // 重複確認
            $existEmail = User::where('email', $request['email'])->first();
            if ($existEmail) {
                throw new HttpException(500, 'このメールアドレスは既に登録されています');
            }

            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => $request['password'],
                'user_img' => $request['user_img'],
                'token' => $request['email'] . Str::random(100),
            ]);
            if ($request['file']) {
                $request['file']->storeAs(
                    '',                 // サブフォルダが不要なら空
                    $request['user_img'],
                    'public'            // ← ここで public ディスクを指定
                );
            }
            return new LoginInfoEntity(
                id: $user->id,
                email: $user->email,
                name: $user->name,
                token: $user->token,
                userImg: $user->user_img,
            );
        }

        // 編集の場合
        $loginInfoModel = (new UserService())->getLoginInfoByRequest($request);
        if (!$loginInfoModel) {
            throw new HttpException(401, 'トークンが有効期限切れです');
        }
        // 重複確認
        $existEmail = User::where('email', $request['email'])->first();
        if ($existEmail && $loginInfoModel['email'] != $request['email']) {
            throw new HttpException(500, 'このメールアドレスは既に登録されています');
        }

        // ユーザー情報編集
        $user = User::where('id', $loginInfoModel['id'])->update([
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
            $request['file']->storeAs(
                '',                 // サブフォルダが不要なら空
                $request['user_img'],
                'public'            // ← ここで public ディスクを指定
            );
        }
        if ($request['user_img'] != $request['img_oldname']) {
            Storage::delete('public/' . $request['img_oldname']);
        }
        $loginInfoModel = (new UserService())->getLoginInfoByRequest($request);

        return new LoginInfoEntity(
            id: $loginInfoModel->id,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
};
