<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class InvitationCreateRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
        ];
    }
}
