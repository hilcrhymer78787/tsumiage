<?php

namespace App\Http\Requests\Base;

use App\Http\Exceptions\AppHttpException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseFormRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new AppHttpException(
            422,
            "バリデーションエラーが発生しました。",
            ['errors'  => $validator->errors()]
        );
    }
}
