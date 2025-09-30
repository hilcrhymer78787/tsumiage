<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\AuthBearer\Services\AuthBearerService;
use Throwable;

class AuthBearerController extends Controller
{
    public function __construct(private AuthBearerService $service) {}

    public function index(FormRequest $request): LoginInfoResource | ErrorResource
    {
        try {
            $loginInfoEntity = $this->service->getLoginInfoEntity($request);
            return new LoginInfoResource($loginInfoEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
