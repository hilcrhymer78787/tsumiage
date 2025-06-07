<?php

declare(strict_types=1);

namespace App\Domains\Shared\CheckIsFriends\Services;

use App\Domains\Shared\CheckIsFriends\Queries\CheckIsFriendsQuery;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CheckIsFriendsService
{
    public function __construct(
        private readonly CheckIsFriendsQuery $query,
    ) {}

    public function checkIsFriends(int $userId1, int $userId2): bool
    {
        return $this->query->checkIsFriends($userId1, $userId2)->exists();
    }
}
