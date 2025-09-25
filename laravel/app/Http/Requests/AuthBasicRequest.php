<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class AuthBasicRequest extends BaseFormRequest

{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
            'password.required' => 'password は必須です。',
            'password.string' => 'password は文字列でなければなりません。',
        ];
    }
}
