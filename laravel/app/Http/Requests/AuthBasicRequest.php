<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class AuthBasicRequest extends BaseFormRequest

{
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
            'email.max' => 'email は255文字以内で入力してください。',

            'password.required' => 'password は必須です。',
            'password.string' => 'password は文字列でなければなりません。',
            'password.min' => 'password は8文字以上で入力してください。',
            'password.max' => 'password は255文字以内で入力してください。',
        ];
    }
}
