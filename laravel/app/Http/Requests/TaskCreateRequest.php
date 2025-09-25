<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class TaskCreateRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'id'          => 'nullable|integer', // 新規登録時は null、編集時は必須なので nullable
            'name'        => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'id.integer'           => 'id は整数でなければなりません。',
            'name.required'        => '名前は必須です。',
            'name.string'          => '名前は文字列でなければなりません。',
        ];
    }
}
