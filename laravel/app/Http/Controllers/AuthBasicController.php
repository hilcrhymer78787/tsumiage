<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\AuthBasic\Services\AuthBasicService;
use App\Http\Requests\AuthBasicRequest;
use App\Domains\AuthBasic\Parameters\AuthBasicParameter;

use Throwable;

class AuthBasicController extends Controller
{
    public function __construct(private AuthBasicService $service) {}

    public function index(AuthBasicRequest $request): LoginInfoResource | ErrorResource
    {
        try {
            $params = AuthBasicParameter::makeParams($request->validated());
            $loginInfoEntity = $this->service->getLoginInfoEntity($params, $request);
            return new LoginInfoResource($loginInfoEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
