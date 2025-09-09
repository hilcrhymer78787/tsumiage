<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class WorkReadMonthRequest extends FormRequest

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

    /**
     * バリデーション失敗時のレスポンスをカスタマイズ
     *
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        // TODO エラーの共通化
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
