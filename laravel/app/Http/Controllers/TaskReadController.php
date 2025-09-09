<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Requests\TaskReadRequest;
use App\Http\Resources\TaskReadResource;
use App\Domains\TaskRead\Parameters\TaskReadParameter;
use App\Domains\TaskRead\Services\TaskReadService;
use Throwable;

class TaskReadController extends Controller
{
    private TaskReadService $service;

    public function __construct(TaskReadService $service)
    {
        $this->service = $service;
    }

    // 型のバリデーションを行う
    public function index(TaskReadRequest $request): TaskReadResource | ErrorResource
    {
        try {
            $params = TaskReadParameter::makeParams($request->validated());
            $taskReadEntity = $this->service->taskRead($params, $request);
            return new TaskReadResource($taskReadEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }

}
