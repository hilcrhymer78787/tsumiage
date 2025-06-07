<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskReadRequest extends FormRequest

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

    /**
     * バリデーション失敗時のレスポンスをカスタマイズ
     *
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 400,
                'code' => 'VALIDATION_ERROR',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 400)
        );
    }
}
