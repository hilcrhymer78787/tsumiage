<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Requests\WorkReadMonthRequest;
use App\Http\Resources\WorkReadMonthResource;
use App\Domains\WorkReadMonth\Parameters\WorkReadMonthParameter;
use App\Domains\WorkReadMonth\Services\WorkReadMonthService;
use Throwable;

class WorkReadMonthController extends Controller
{
    public function __construct(private WorkReadMonthService $service) {}

    // 型のバリデーションを行う
    public function index(WorkReadMonthRequest $request): WorkReadMonthResource | ErrorResource
    {
        try {
            $params = WorkReadMonthParameter::makeParams($request->validated());
            $workReadMonthEntity = $this->service->workReadMonth($params, $request);
            return new WorkReadMonthResource($workReadMonthEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
