<?php

namespace App\Domains\TaskRead\Interfaces\Services;

use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Http\Requests\TaskReadRequest;
use Illuminate\Support\Collection;

interface TaskReadServiceInterface
{
    public function taskRead(TaskReadParameter $params, TaskReadRequest $request): Collection;
}
