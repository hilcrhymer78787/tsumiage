<?php

namespace App\Http\Controllers;

use App\Domains\TaskSort\Parameters\TaskSortParameter;
use App\Http\Resources\Common\ErrorResource;
use App\Domains\TaskSort\Services\TaskSortService;
use App\Http\Requests\TaskSortRequest;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class TaskSortController extends Controller
{
    private TaskSortService $service;

    public function __construct(TaskSortService $service)
    {
        $this->service = $service;
    }

    public function index(TaskSortRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = TaskSortParameter::makeParams($request->validated());
            $message = $this->service->sortTask($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
