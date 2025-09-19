<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\UserDelete\Services\UserDeleteService;
use Illuminate\Foundation\Http\FormRequest;
use Throwable;

class UserDeleteController extends Controller
{
    private UserDeleteService $service;

    public function __construct(UserDeleteService $service)
    {
        $this->service = $service;
    }

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
