<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthBasicRequest extends FormRequest

{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'email は必須です。',
            'email.email' => 'email はメールアドレス形式でなければなりません。',
            'password.required' => 'password は必須です。',
            'password.string' => 'password は文字列でなければなりません。',
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
