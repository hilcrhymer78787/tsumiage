<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Http\Resources\Common\LoginInfoResource;
use App\Domains\AuthTest\Services\AuthTestService;
use Throwable;

class AuthTestController extends Controller
{
    public function __construct(
        private readonly AuthTestService $service,
    ) {}

    public function index(): LoginInfoResource | ErrorResource
    {
        try {
            $loginInfoEntity = $this->service->getLoginInfoEntity();
            return new LoginInfoResource($loginInfoEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
