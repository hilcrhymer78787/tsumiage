<?php

namespace App\Domains\AuthBasic\Queries;

use App\Domains\AuthBasic\Parameters\AuthBasicParameter;
use App\Models\User;

class AuthBasicQuery
{
    public function getLoginInfo(AuthBasicParameter $params): ?User
    {
        return User::where('email', $params->email)->first();
    }
}