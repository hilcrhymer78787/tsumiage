<?php

namespace App\Domains\InvitationUpdate\Parameters;

readonly class InvitationUpdateParameter
{
    public function __construct(
        public int $invitationId,
    ) {}

    public static function makeParams(array $validated): self
    {
        return new self(
            invitationId: $validated['invitation_id'],
        );
    }
}
