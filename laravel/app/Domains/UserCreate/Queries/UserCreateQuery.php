<?php

namespace App\Domains\UserCreate\Queries;

use App\Domains\UserCreate\Parameters\UserCreateParameter;
use App\Models\User;

class UserCreateQuery
{
    public function getLoginInfoModel(UserCreateParameter $params): User|null
    {
        return User::where('email', $params->email)->first();
    }
}
