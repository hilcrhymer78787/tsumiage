<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class InvitationCreateRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
            'email.max' => 'email は255文字以内で入力してください。',
        ];
    }
}
