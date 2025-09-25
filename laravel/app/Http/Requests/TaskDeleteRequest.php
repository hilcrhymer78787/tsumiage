<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class TaskDeleteRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'id.integer' => 'id は整数でなければなりません。',
            'id.required' => 'id は必須です。',
        ];
    }
}
