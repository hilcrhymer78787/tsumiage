<?php

declare(strict_types=1);

namespace App\Domains\AuthTest\Services;

use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\AuthTest\Queries\AuthTestQuery;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthTestService
{
    public function __construct(
        private readonly AuthTestQuery $query,
    ) {}

    public function getLoginInfoEntity(): LoginInfoEntity
    {
        $loginInfoModel = $this->query->getLoginInfoModel();

        if (!$loginInfoModel) {
            // TODO このエラーも共通化
            throw new HttpException(403, 'テストユーザーが見つかりませんでした');
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
