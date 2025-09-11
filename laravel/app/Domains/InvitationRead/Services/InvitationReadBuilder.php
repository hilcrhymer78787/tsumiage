<?php

namespace App\Domains\InvitationRead\Services;

use App\Domains\Shared\Task\Entities\TaskEntity;
use App\Domains\Shared\Work\Factories\WorkFactory;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class InvitationReadBuilder
{
    public function __construct(
        private readonly WorkFactory $workFactory,
    ) {}

    public function build(Collection $fromFriendModels, Collection $nowFriendModels, Collection $toFriendModels): Collection
    {
        return collect([
            "fromFriends"  => $fromFriendModels,
            "nowFriends" => $nowFriendModels,
            "toFriends" => $toFriendModels,
        ]);
    }
}
