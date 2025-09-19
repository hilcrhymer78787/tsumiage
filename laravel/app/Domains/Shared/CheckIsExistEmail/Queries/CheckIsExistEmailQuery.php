<?php

namespace App\Domains\Shared\CheckIsExistEmail\Queries;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class CheckIsExistEmailQuery
{
    public function checkIsExistEmail(string $email): Builder
    {
        return User::where('email', $email);
    }
}
