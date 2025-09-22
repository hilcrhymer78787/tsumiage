<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class WorkReadMonthRequest extends BaseFormRequest

{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|integer',
            'year' => 'required|integer',
            'month' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'user_id は必須です。',
            'user_id.integer' => 'user_id は整数でなければなりません。',
            'year.required' => 'year は必須です。',
            'year.integer' => 'year は整数でなければなりません。',
            'month.required' => 'month は必須です。',
            'month.integer' => 'month は整数でなければなりません。',
        ];
    }
}
