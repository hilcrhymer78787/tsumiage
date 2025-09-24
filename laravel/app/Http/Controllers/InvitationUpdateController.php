<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\InvitationUpdate\Services\InvitationUpdateService;
use App\Http\Requests\InvitationUpdateRequest;
use App\Domains\InvitationUpdate\Parameters\InvitationUpdateParameter;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class InvitationUpdateController extends Controller
{
    private InvitationUpdateService $service;

    public function __construct(InvitationUpdateService $service)
    {
        $this->service = $service;
    }

    public function index(InvitationUpdateRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = InvitationUpdateParameter::makeParams($request->validated());
            $message = $this->service->updateInvitation($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
