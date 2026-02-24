<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AchievementTypeStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => 'required|string|min:2|max:16',
            'name'=> 'required|string',
            'description'=> 'required|string',
            'requirement_type'=> 'required|string',
            'requirement_value'=> 'required|integer',
            'icon' => 'required|image|mimes:jpg,png,webp,jpeg|max:2048',
        ];
    }
    public function messages()
    {
        return [
    ''=> ''
        ];
    }
}
