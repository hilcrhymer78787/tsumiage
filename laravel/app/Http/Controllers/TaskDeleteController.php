<?php

namespace App\Http\Controllers;

use App\Domains\TaskDelete\Parameters\TaskDeleteParameter;
use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\TaskDelete\Services\TaskDeleteService;
use App\Http\Requests\TaskDeleteRequest;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class TaskDeleteController extends Controller
{
    private TaskDeleteService $service;

    public function __construct(TaskDeleteService $service)
    {
        $this->service = $service;
    }

    public function index(TaskDeleteRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = TaskDeleteParameter::makeParams($request->validated());
            $message = $this->service->deleteTask($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
