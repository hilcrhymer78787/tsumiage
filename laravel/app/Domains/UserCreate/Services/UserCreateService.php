<?php

declare(strict_types=1);

namespace App\Domains\UserCreate\Services;

use App\Domains\AuthBasic\Queries\AuthBasicQuery;
use App\Domains\UserCreate\Parameters\UserCreateParameter;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\UserCreate\Queries\UserCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly UserCreateQuery $query,
        private readonly UserService $userService,
    ) {}

    public function getLoginInfoEntity(UserCreateParameter $params, UserCreateRequest $request): LoginInfoEntity
    {
        return empty($request['id'])
            ? $this->createUser($request)
            : $this->updateUser($request);
    }

    /**
     * 新規作成処理
     */
    private function createUser(UserCreateRequest $request): LoginInfoEntity
    {
        $this->assertEmailUnique($request['email']);

        $loginInfoModel = User::create([
            'name'     => $request['name'],
            'email'    => $request['email'],
            'password' => $request['password'],
            'user_img' => $request['user_img'],
            'token'    => $request['email'] . Str::random(100),
        ]);

        $this->storeUserFile($request);

        return $this->toLoginInfoEntity($loginInfoModel);
    }

    /**
     * 更新処理
     */
    private function updateUser(UserCreateRequest $request): LoginInfoEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        if (!$loginInfoModel) {
            throw new HttpException(401, 'トークンが有効期限切れです');
        }

        $this->assertEmailUnique($request['email'], $loginInfoModel->email);

        User::where('id', $loginInfoModel->id)->update([
            'name'     => $request['name'],
            'email'    => $request['email'],
            'user_img' => $request['user_img'],
        ]);

        if (!empty($request['password'])) {
            User::where('id', $request['id'])->update([
                'password' => $request['password'],
            ]);
        }

        $this->storeUserFile($request);

        if ($request['user_img'] !== $request['img_oldname']) {
            Storage::delete('public/' . $request['img_oldname']);
        }

        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);

        return $this->toLoginInfoEntity($loginInfoModel);
    }

    /**
     * メールアドレスの重複確認
     */
    private function assertEmailUnique(string $email, ?string $currentEmail = null): void
    {
        $existEmail = User::where('email', $email)->first();

        if ($existEmail && $existEmail->email !== $currentEmail) {
            throw new HttpException(500, 'このメールアドレスは既に登録されています');
        }
    }

    /**
     * ファイル保存処理
     */
    private function storeUserFile(UserCreateRequest $request): void
    {
        if (empty($request['file'])) return;
        $request['file']->storeAs(
            '',                 // サブフォルダが不要なら空
            $request['user_img'],
            'public'
        );
    }

    /**
     * Entity 変換
     */
    private function toLoginInfoEntity(User $loginInfoModel): LoginInfoEntity
    {
        return new LoginInfoEntity(
            id: $loginInfoModel->id,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
}
