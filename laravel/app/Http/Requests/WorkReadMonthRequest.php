<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class WorkReadMonthRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => 'required|integer',
            'year' => 'required|integer|min:1900|max:2100',
            'month' => 'required|integer|min:1|max:12',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'user_id は必須です。',
            'user_id.integer' => 'user_id は整数でなければなりません。',
            'year.required' => 'year は必須です。',
            'year.integer' => 'year は整数でなければなりません。',
            'year.min' => 'year は1900以上でなければなりません。',
            'year.max' => 'year は2100以下でなければなりません。',
            'month.required' => 'month は必須です。',
            'month.integer' => 'month は整数でなければなりません。',
            'month.min' => 'month は1以上でなければなりません。',
            'month.max' => 'month は12以下でなければなりません。',
        ];
    }
}
