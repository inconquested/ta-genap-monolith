<?php

namespace App\Http\Requests\PollCategory;

use Illuminate\Foundation\Http\FormRequest;

class PollCategoryUpdateRequest extends FormRequest
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
            'label' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'label.string' => 'Label harus berupa string',
            'label.max' => 'Label tidak boleh lebih dari 255 karakter',
            'description.string' => 'Deskripsi harus berupa string',
            'description.max' => 'Deskripsi tidak boleh lebih dari 255 karakter',
        ];
    }
}
