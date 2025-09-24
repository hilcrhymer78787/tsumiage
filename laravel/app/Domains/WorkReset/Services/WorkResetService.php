<?php

declare(strict_types=1);

namespace App\Domains\WorkReset\Services;

use App\Domains\WorkReset\Parameters\WorkResetParameter;
use App\Domains\WorkReset\Queries\WorkResetQuery;
use App\Domains\Shared\LoginInfo\Services\LoginInfoService;
use Illuminate\Foundation\Http\FormRequest;

class WorkResetService
{
    public function __construct(
        private readonly LoginInfoService $loginInfoService,
        private readonly WorkResetQuery $query,
    ) {}

    public function resetWork(FormRequest $request): string
    {
        $userId = $this->loginInfoService->getLoginInfo($request)->id;

        $this->query->taskUpdate($userId);
        $this->query->resetWork($userId);
        
        return "活動情報を全て削除しました";
    }
}
