<?php

namespace App\Domains\UserCreate\Queries;

use App\Domains\UserCreate\Parameters\UserCreateParameter;
use App\Models\User;
use Illuminate\Support\Str;

class UserCreateQuery
{
    public function createUser(UserCreateParameter $params): User|null
    {
        return User::create([
            'name'     => $params->name,
            'email'    => $params->email,
            'password' => $params->password,
            'user_img' => $params->userImg,
            'token'    => $params->email . Str::random(100),
        ]);
    }
    public function updateUser(UserCreateParameter $params, User $loginInfoModel): void
    {
        User::where('id', $loginInfoModel->id)->update([
            'name'     => $params->name,
            'email'    => $params->email,
            'user_img' => $params->userImg,
        ]);
    }
    public function updatePassword(UserCreateParameter $params, User $loginInfoModel): void
    {
        User::where('id', $loginInfoModel->id)->update([
            'password' => $params->password,
        ]);
    }
}
