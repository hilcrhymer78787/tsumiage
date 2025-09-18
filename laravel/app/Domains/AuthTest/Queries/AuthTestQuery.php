<?php

namespace App\Domains\AuthTest\Queries;

use App\Models\User;
use Illuminate\Support\Collection;

class AuthTestQuery
{
    public function getLoginInfoModel(): User
    {
        $query =  User::find(1);
        return $query;
    }
}
