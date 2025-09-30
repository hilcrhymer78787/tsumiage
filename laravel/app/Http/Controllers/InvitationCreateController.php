<?php

namespace App\Http\Controllers;

use App\Http\Resources\Common\ErrorResource;
use App\Domains\InvitationCreate\Services\InvitationCreateService;
use App\Http\Requests\InvitationCreateRequest;
use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Http\Resources\Common\SuccessResource;
use Throwable;

class InvitationCreateController extends Controller
{
    public function __construct(private InvitationCreateService $service) {}

    public function index(InvitationCreateRequest $request): SuccessResource | ErrorResource
    {
        try {
            $params = InvitationCreateParameter::makeParams($request->validated());
            $message = $this->service->updateOrCreateInvitation($params, $request);
            return new SuccessResource($message);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
