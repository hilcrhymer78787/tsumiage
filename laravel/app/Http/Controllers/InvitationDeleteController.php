<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\InvitationDelete\Services\InvitationDeleteService;
use App\Http\Requests\InvitationDeleteRequest;
use App\Domains\InvitationDelete\Parameters\InvitationDeleteParameter;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class InvitationDeleteController extends Controller
{
    private InvitationDeleteService $service;

    public function __construct(InvitationDeleteService $service)
    {
        $this->service = $service;
    }

    public function index(InvitationDeleteRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = InvitationDeleteParameter::makeParams($request->validated());
            $message = $this->service->deleteInvitation($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
