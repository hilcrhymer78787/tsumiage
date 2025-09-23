<?php

declare(strict_types=1);

namespace App\Domains\UserCreate\Services;

use App\Domains\Shared\CheckIsExistEmail\Services\CheckIsExistEmailService;
use App\Domains\UserCreate\Parameters\UserCreateParameter;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\UserCreate\Queries\UserCreateQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserCreateService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly CheckIsExistEmailService $checkIsExistEmailService,
        private readonly UserService $userService,
        private readonly UserCreateQuery $query,
    ) {}

    public function getLoginInfoEntity(UserCreateParameter $params, UserCreateRequest $request): LoginInfoEntity
    {
        return empty($params->id)
            ? $this->createUser($params, $request)
            : $this->updateUser($params, $request);
    }

    /**
     * 新規作成処理
     */
    private function createUser(UserCreateParameter $params, UserCreateRequest $request): LoginInfoEntity
    {
        $this->assertEmailUnique($params->email);

        $loginInfoModel = $this->query->createUser($params);
        $this->storeUserFile($params, $request);

        return $this->toLoginInfoEntity($loginInfoModel);
    }

    /**
     * 更新処理
     */
    private function updateUser(UserCreateParameter $params, UserCreateRequest $request): LoginInfoEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);
        if (!$loginInfoModel) throw new HttpException(401, 'トークンが有効期限切れです');

        $this->assertEmailUnique($params->email, $loginInfoModel->email);

        $this->query->updateUser($params, $loginInfoModel);


        if (!empty($params->password)) {
            $this->query->updatePassword($params, $loginInfoModel);
        }

        $this->storeUserFile($params, $request);

        if ($params->userImg !== $params->imgOldname) {
            Storage::delete('public/' . $params->imgOldname);
        }

        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);

        return $this->toLoginInfoEntity($loginInfoModel);
    }

    /**
     * メールアドレスの重複確認
     */
    private function assertEmailUnique(string $email, ?string $currentEmail = null): void
    {
        $existEmail = $this->checkIsExistEmailService->checkIsExistEmail($email);

        if ($existEmail && $email !== $currentEmail) {
            throw new HttpException(500, 'このメールアドレスは既に登録されています');
        }
    }

    /**
     * ファイル保存処理
     */
    private function storeUserFile(UserCreateParameter $params, UserCreateRequest $request): void
    {
        if (empty($request['file'])) return;
        $request['file']->storeAs(
            '',                 // サブフォルダが不要なら空
            $params->userImg,
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
