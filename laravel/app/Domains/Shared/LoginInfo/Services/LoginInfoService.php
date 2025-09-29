<?php

namespace App\Domains\Shared\LoginInfo\Services;

use App\Domains\Shared\LoginInfo\Queries\LoginInfoQuery;
use App\Models\User;
use Illuminate\Http\Request;

class LoginInfoService
{
    public function __construct(
        private readonly LoginInfoQuery $query,
    ) {}

    public function getLoginInfo(Request $request): ?User
    {
        return $this->query->getLoginInfo($request);
    }
}
