<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class WorkCreateRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'state'    => 'required|integer|in:0,1,2',
            'date'     => 'required|date_format:Y-m-d',
            'task_id'  => 'required|integer|exists:tasks,task_id',
        ];
    }

    public function messages(): array
    {
        return [
            'state.required'   => '状態は必須です。',
            'state.integer'    => '状態は整数でなければなりません。',
            'state.in'         => '状態は 0, 1, 2 のいずれかで指定してください。',

            'date.required'    => '日付は必須です。',
            'date.date_format' => '日付は Y-m-d 形式で入力してください。',

            'task_id.required' => 'タスクIDは必須です。',
            'task_id.integer'  => 'タスクIDは整数でなければなりません。',
            'task_id.exists'   => '指定されたタスクは存在しません。',
        ];
    }
}
