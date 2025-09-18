<?php

declare(strict_types=1);

namespace App\Domains\AuthBearer\Services;

use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\AuthBearer\Queries\AuthBearerQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthBearerService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,

    ) {}

    public function getLoginInfoEntity(FormRequest $request): LoginInfoEntity
    {
        $loginInfoModel = $this->loginInfoService->getLoginInfo($request);

        if (!$loginInfoModel) {
            // TODO このエラーも共通化
            throw new HttpException(403, 'トークンが有効期限切れです');
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
