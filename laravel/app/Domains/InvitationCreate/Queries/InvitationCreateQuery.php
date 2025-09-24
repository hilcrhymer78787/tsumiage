<?php

namespace App\Domains\InvitationCreate\Queries;

use App\Domains\InvitationCreate\Parameters\InvitationCreateParameter;
use App\Models\Invitation;

class InvitationCreateQuery
{
    // すでに友達か確認
    public function getIsAlreadyFriend(int $myUserId, int $targetUserId): bool
    {
        return Invitation::where(function ($query) use ($myUserId, $targetUserId) {
            $query->where('invitation_from_user_id', $myUserId)
                ->where('invitation_to_user_id', $targetUserId);
        })
            ->orWhere(function ($query) use ($myUserId, $targetUserId) {
                $query->where('invitation_from_user_id', $targetUserId)
                    ->where('invitation_to_user_id', $myUserId);
            })
            ->where('invitation_status', 2)
            ->exists();
    }

    // すでに申請済みか確認（自分→相手）
    public function getIsAlreadySentRequest(int $myUserId, int $targetUserId): bool
    {
        return Invitation::where('invitation_from_user_id', $myUserId)
            ->where('invitation_to_user_id', $targetUserId)
            ->where('invitation_status', 1)
            ->exists();
    }

    // すでに相手から申請が来ているか確認
    public function getIsAlreadyReceivedRequest(int $myUserId, int $targetUserId): bool
    {
        return Invitation::where('invitation_to_user_id', $myUserId)
            ->where('invitation_from_user_id', $targetUserId)
            ->where('invitation_status', 1)
            ->exists();
    }

    // 友達申請
    public function createInvitation(int $myUserId, int $targetUserId): Invitation
    {
        return Invitation::create([
            'invitation_from_user_id' => $myUserId,
            'invitation_to_user_id' => $targetUserId,
            'invitation_status' => 1,
        ]);
    }
}
