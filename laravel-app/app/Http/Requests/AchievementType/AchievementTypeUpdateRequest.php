<?php

namespace App\Http\Requests\AchievementType;

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
    public function messages(): array
    {
        return [
            'code.min' => 'Kode achievement harus terdiri dari minimal 2 karakter.',
            'code.max' => 'Kode achievement tidak boleh lebih dari 16 karakter.',
            'name.required' => 'Nama achievement harus diisi.',
            'description.required' => 'Deskripsi achievement harus diisi.',
            'requirement_type.required' => 'Tipe requirement harus diisi.',
            'requirement_value.required' => 'Nilai requirement harus diisi.',
            'requirement_value.integer' => 'Nilai requirement harus berupa angka.',
            'icon.image' => 'File yang diunggah harus berupa gambar.',
            'icon.mimes' => 'Icon harus berupa file berformat: jpg, png, webp, jpeg.',
            'icon.max' => 'Ukuran icon tidak boleh lebih dari 2MB (2048 KB).',
        ];
    }
}
