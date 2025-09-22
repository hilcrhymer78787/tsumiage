<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id'          => 'nullable|integer', // 新規登録時は null、編集時は必須なので nullable
            'name'        => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'id.integer'           => 'id は整数でなければなりません。',
            'name.required'        => '名前は必須です。',
            'name.string'          => '名前は文字列でなければなりません。',
        ];
    }

    /**
     * バリデーション失敗時のレスポンスをカスタマイズ
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status'  => 400,
                'code'    => 'VALIDATION_ERROR',
                'message' => $validator->errors()->first(),
                'errors'  => $validator->errors(),
            ], 400)
        );
    }
}
