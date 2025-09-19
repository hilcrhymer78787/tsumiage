<?php

namespace App\Domains\UserDelete\Queries;

use App\Domains\UserDelete\Parameters\UserDeleteParameter;
use App\Models\Invitation;
use App\Models\Task;
use App\Models\User;
use App\Models\Work;
use Illuminate\Support\Str;

class UserDeleteQuery
{
    public function deleteUser(int $userId): void
    {
        User::where('id', $userId)->delete();
    }
}
