<?php

namespace App\Domains\InvitationDelete\Parameters;

readonly class InvitationDeleteParameter
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
