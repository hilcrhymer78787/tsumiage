<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\UserCreate\Services\UserCreateService;
use App\Http\Requests\UserCreateRequest;
use App\Domains\UserCreate\Parameters\UserCreateParameter;

use Throwable;

class UserCreateController extends Controller
{
    public function __construct(private UserCreateService $service) {}

    public function index(UserCreateRequest $request): LoginInfoResource | ErrorResource
    {
        try {
            $params = UserCreateParameter::makeParams($request->validated());
            $loginInfoEntity = $this->service->getLoginInfoEntity($params, $request);
            return new LoginInfoResource($loginInfoEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
