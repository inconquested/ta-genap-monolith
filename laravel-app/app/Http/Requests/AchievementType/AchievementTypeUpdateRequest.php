<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AchievementTypeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => 'sometimes|string|min:2|max:16',
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'requirement_type' => 'sometimes|string',
            'requirement_value' => 'sometimes|integer',
            'icon' => 'sometimes|image|mimes:jpg,png,webp,jpeg|max:2048',
        ];
    }
}
