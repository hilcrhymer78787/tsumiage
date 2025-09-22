<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class TaskReadRequest extends BaseFormRequest

{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|integer',
            'date' => 'required|date_format:Y-m-d',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'user_id は必須です。',
            'user_id.integer' => 'user_id は整数でなければなりません。',
            'date.required' => 'date は必須です。',
            'date.date_format' => 'date は YYYY-MM-DD 形式で入力してください。',
        ];
    }
}
