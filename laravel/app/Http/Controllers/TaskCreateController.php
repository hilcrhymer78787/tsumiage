<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\TaskCreate\Services\TaskCreateService;
use App\Http\Requests\TaskCreateRequest;
use App\Domains\TaskCreate\Parameters\TaskCreateParameter;
use Illuminate\Http\Resources\Json\JsonResource;
use Throwable;

class TaskCreateController extends Controller
{
    private TaskCreateService $service;

    public function __construct(TaskCreateService $service)
    {
        $this->service = $service;
    }

    public function index(TaskCreateRequest $request): JsonResource | ErrorResource
    {
        try {
            $params = TaskCreateParameter::makeParams($request->validated());
            $this->service->upsertTask($params, $request);
            return new JsonResource([
                'status' => 200,
                'message' => 'タスクを作成しました',
            ]);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
