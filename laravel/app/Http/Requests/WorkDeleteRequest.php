<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class WorkDeleteRequest extends BaseFormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'id.integer' => 'id は整数でなければなりません。',
            'id.required' => 'id は必須です。',
        ];
    }
}
