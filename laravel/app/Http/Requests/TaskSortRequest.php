<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class TaskSortRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'ids.required' => 'ids は必須です。',
            'ids.array' => 'ids は配列でなければなりません。',
            'ids.*.required' => '各タスクIDは必須です。',
            'ids.*.integer' => '各タスクIDは整数でなければなりません。',
        ];
    }
}
