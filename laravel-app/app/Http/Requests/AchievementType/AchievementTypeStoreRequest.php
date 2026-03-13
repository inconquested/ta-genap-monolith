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
            'code' => 'required|string|min:2|max:16',
            'name' => 'required|string',
            'description' => 'required|string',
            'requirement_type' => 'required|string',
            'requirement_value' => 'required|integer',
            'icon' => 'required|image|mimes:jpg,png,webp,jpeg|max:2048',
        ];
    }
    public function messages(): array
    {
        return [
            'code.required' => 'The achievement code is required.',
            'code.min' => 'The achievement code must be at least 2 characters.',
            'code.max' => 'The achievement code may not be greater than 16 characters.',
            'name.required' => 'Please provide a name for this achievement.',
            'description.required' => 'An achievement description is required to help users understand what this entails.',
            'requirement_type.required' => 'You must specify a requirement type for the achievement.',
            'requirement_value.required' => 'A requirement value is required.',
            'requirement_value.integer' => 'The requirement value must be a valid number.',
            'icon.required' => 'An icon image is required for the achievement.',
            'icon.image' => 'The uploaded file must be an image.',
            'icon.mimes' => 'The icon must be a file of type: jpg, png, webp, jpeg.',
            'icon.max' => 'The icon size may not be greater than 2MB (2048 KB).',
        ];
    }
}
