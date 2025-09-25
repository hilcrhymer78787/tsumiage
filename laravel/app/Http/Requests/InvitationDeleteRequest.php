<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class InvitationDeleteRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'invitation_id' => 'required|integer|exists:invitations,invitation_id',
        ];
    }

    public function messages(): array
    {
        return [
            'invitation_id.integer' => 'invitation_id は整数でなければなりません。',
            'invitation_id.required' => 'invitation_id は必須です。',
            'invitation_id.exists'   => '指定された招待情報は存在しません。',
        ];
    }
}