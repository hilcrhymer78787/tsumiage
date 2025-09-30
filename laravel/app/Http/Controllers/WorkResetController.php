<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\WorkReset\Services\WorkResetService;
use App\Http\Resources\Common\SuccessResource;
use Illuminate\Foundation\Http\FormRequest;
use Throwable;

class WorkResetController extends Controller
{
    public function __construct(private WorkResetService $service) {}

    public function index(FormRequest $request): SuccessResource | ErrorResource
    {
        try {
            $message = $this->service->resetWork($request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
