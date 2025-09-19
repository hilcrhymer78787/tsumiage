<?php

namespace App\Domains\Shared\LoginInfo\Queries;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class LoginInfoQuery
{
    public function getLoginInfoBuilder(FormRequest $request): Builder
    {
        $token = substr($request->header('Authorization'), 7);
        $query = User::where('token', $token)
            ->select('id', 'email', 'name', 'user_img', 'token');
        return $query;
    }
}
