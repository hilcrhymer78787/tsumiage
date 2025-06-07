<?php

namespace App\Domains\Shared\LoginInfo\Queries;

use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Enums\LoginInfos\DisplayType;
use App\Enums\LoginInfos\Status;
use App\Models\LoginInfo;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class LoginInfoQuery
{
    public function getLoginInfo(FormRequest $request): Builder
    {
        $token = substr($request->header('Authorization'), 7);
        $query = User::where('token', $token)
            ->select('id', 'email', 'name', 'user_img', 'token');
        return $query;
    }
}
