<?php

namespace App\Domains\AuthTest\Queries;

use App\Models\User;
use Illuminate\Support\Collection;

class AuthTestQuery
{
    public function getLoginInfoModel(): User
    {
        return User::find(1);
    }
}
