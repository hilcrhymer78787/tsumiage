<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\WorkCreate\Services\WorkCreateService;
use App\Http\Requests\WorkCreateRequest;
use App\Domains\WorkCreate\Parameters\WorkCreateParameter;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class WorkCreateController extends Controller
{
    public function __construct(private WorkCreateService $service) {}

    public function index(WorkCreateRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = WorkCreateParameter::makeParams($request->validated());
            $message = $this->service->updateOrCreateWork($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
