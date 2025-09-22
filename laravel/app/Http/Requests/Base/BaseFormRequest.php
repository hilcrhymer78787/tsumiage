<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class BaseFormRequest extends FormRequest
{
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
