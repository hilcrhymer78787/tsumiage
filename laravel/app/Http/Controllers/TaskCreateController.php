<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\TaskCreate\Services\TaskCreateService;
use App\Http\Requests\TaskCreateRequest;
use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use App\Http\Resources\Base\SuccessResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Throwable;

class TaskCreateController extends Controller
{
    private TaskCreateService $service;

    public function __construct(TaskCreateService $service)
    {
        $this->service = $service;
    }

    public function index(TaskCreateRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = TaskCreateParameter::makeParams($request->validated());
            $message = $this->service->upsertTask($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
