<?php

namespace App\Domains\AuthTest\Queries;

use App\Models\User;

class AuthTestQuery
{
    public function getLoginInfoModel(): User | null
    {
        return User::find(1);
    }
}
