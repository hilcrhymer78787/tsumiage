<?php

namespace App\Http\Requests\Base;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class BaseFormRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        // TODO: ErrorResource を使いたい
        throw new HttpResponseException(
            response()->json([
                'data' => [
                    'status'  => 400,
                    'message'    => 'バリデーションエラーが発生しました。',
                    'errors'  => $validator->errors(),
                ]
            ], 400)
        );
    }
}
