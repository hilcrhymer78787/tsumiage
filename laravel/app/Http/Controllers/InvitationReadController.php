<?php

namespace App\Http\Controllers;

use App\Domains\InvitationRead\Services\InvitationReadService;
use App\Http\Resources\Common\ErrorResource;
use App\Http\Requests\InvitationReadRequest;
use App\Http\Resources\InvitationReadResource;

use Throwable;

class InvitationReadController extends Controller
{
    private InvitationReadService $service;

    public function __construct(InvitationReadService $service)
    {
        $this->service = $service;
    }

    // 型のバリデーションを行う
    public function index(InvitationReadRequest $request)
    // : InvitationReadResource | ErrorResource
    {
        try {
            $invitationReadEntity = $this->service->invitationRead($request);
            return $invitationReadEntity;
            return new InvitationReadResource($invitationReadEntity);
        } catch (Throwable $error) {
            debugError($error);
            return new ErrorResource($error);
        }
    }
}
