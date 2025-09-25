<?php

namespace App\Http\Requests;

use App\Http\Requests\Base\BaseFormRequest;

class UserCreateRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'id'          => 'nullable|integer', // 新規登録時は null、編集時は必須なので nullable
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'password'    => 'nullable|string|min:8',
            'user_img'    => 'nullable|string|max:255',
            'img_oldname' => 'nullable|string|max:255',
            'file'        => 'nullable|file|mimes:jpg,jpeg,png,gif|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'id.integer'           => 'id は整数でなければなりません。',
            'name.required'        => '名前は必須です。',
            'name.string'          => '名前は文字列でなければなりません。',
            'email.required'       => 'email は必須です。',
            'email.email'          => 'email はメールアドレス形式でなければなりません。',
            'password.string'      => 'password は文字列でなければなりません。',
            'password.min'         => 'password は8文字以上で設定してください。',
            'user_img.string'      => 'ユーザー画像は文字列でなければなりません。',
            'img_oldname.string'   => '古い画像名は文字列でなければなりません。',
            'file.file'            => 'アップロードされたデータがファイルではありません。',
            'file.mimes'           => 'ファイル形式は jpg, jpeg, png, gif のいずれかでなければなりません。',
            'file.max'             => 'ファイルは:max 5MB 以下でなければなりません。',
        ];
    }
}
