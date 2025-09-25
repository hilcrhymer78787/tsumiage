<?php

declare(strict_types=1);

namespace App\Domains\AuthTest\Services;

use App\Domains\Shared\LoginInfo\Entities\LoginInfoEntity;
use App\Domains\AuthTest\Queries\AuthTestQuery;
use App\Http\Exceptions\AppHttpException;

class AuthTestService
{
    public function __construct(
        private readonly AuthTestQuery $query,
    ) {}

    public function getLoginInfoEntity(): LoginInfoEntity
    {
        $loginInfoModel = $this->query->getLoginInfoModel();
        if (!$loginInfoModel) throw new AppHttpException(404, 'テストユーザーが見つかりませんでした');

        return new LoginInfoEntity(
            id: $loginInfoModel->id,
            email: $loginInfoModel->email,
            name: $loginInfoModel->name,
            token: $loginInfoModel->token,
            userImg: $loginInfoModel->user_img,
        );
    }
};
