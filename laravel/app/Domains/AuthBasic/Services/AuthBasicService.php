<?php

declare(strict_types=1);

namespace App\Domains\AuthBasic\Services;

use App\Domains\AuthBasic\Parameters\AuthBasicParameter;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\AuthBasic\Queries\AuthBasicQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Exceptions\AppHttpException;
use Illuminate\Support\Facades\Hash;

class AuthBasicService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly AuthBasicQuery $query,
    ) {}

    /**
     * メールアドレス・パスワード認証
     */
    public function getLoginInfoEntity(AuthBasicParameter $params): LoginInfoEntity
    {
        $loginInfoModel = $this->query->getLoginInfo($params);
        if (!$loginInfoModel) throw new AppHttpException(404, "", ['emailError' => 'このメールアドレスは登録されていません']);

        $isCorrect = Hash::check($params->password, $loginInfoModel->password);
        if (!$isCorrect) throw new AppHttpException(401, "", ['passwordError' => 'パスワードが間違っています']);

        return new LoginInfoEntity(
            id: $loginInfoModel->id,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
}
