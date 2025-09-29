<?php

namespace App\Domains\Shared\LoginInfo\Queries;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class LoginInfoQuery
{
    public function getLoginInfo(Request $request): ?User
    {
        $token = substr($request->header('Authorization'), 7);
        return User::where('token', $token)
            ->select('id', 'email', 'name', 'user_img', 'token')
            ->first();
    }
}
