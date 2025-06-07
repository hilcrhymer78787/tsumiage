<?php

namespace App\Domains\Shared\LoginInfo\Services;

use App\Domains\Shared\LoginInfo\Queries\LoginInfoQuery;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Foundation\Http\FormRequest;

class LoginInfoService
{
    public function __construct(
        private readonly LoginInfoQuery $query,
    ) {}

    public function getLoginInfo(FormRequest $request): ?User
    {
        return $this->query->getLoginInfo($request)->first();
    }
}
