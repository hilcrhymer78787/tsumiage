<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class InvitationReadRequest extends FormRequest

{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function messages()
    {
        return [];
    }

    /**
     * バリデーション失敗時のレスポンスをカスタマイズ
     *
     * @return void
     */
    protected function failedValidation(Validator $validator) {}
}
