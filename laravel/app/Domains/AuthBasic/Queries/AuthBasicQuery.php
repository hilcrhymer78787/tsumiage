<?php

namespace App\Domains\AuthBasic\Queries;

use App\Domains\AuthBasic\Parameters\AuthBasicParameter;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class AuthBasicQuery
{
    public function getLoginInfoBuilder(AuthBasicParameter $params): Builder
    {
        return User::where('email', $params->email);
    }
}