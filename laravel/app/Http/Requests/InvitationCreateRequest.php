<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class InvitationCreateRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
        ];
    }
}
