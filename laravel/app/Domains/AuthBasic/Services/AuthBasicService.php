<?php

declare(strict_types=1);

namespace App\Domains\AuthBasic\Services;

use App\Domains\AuthBasic\Parameters\AuthBasicParameter;
use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\AuthBasic\Queries\AuthBasicQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use App\Http\Requests\AuthBasicRequest;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthBasicService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly AuthBasicQuery $query,
    ) {}

    public function getLoginInfoEntity(AuthBasicParameter $params, AuthBasicRequest $request): LoginInfoEntity
    {
        $loginInfoModel = $this->query->getLoginInfoModel($params);
        if (!$loginInfoModel) {
            throw new HttpException(500, 'このメールアドレスは登録されていません');
        }

        $isCorrect = $loginInfoModel->password === $params->password;
        if (!$isCorrect) {
            throw new HttpException(500, 'パスワードが間違っています');
        }

        return new LoginInfoEntity(
            id: $loginInfoModel->id,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
};
