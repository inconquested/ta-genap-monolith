<?php

namespace App\Http\Requests\Poll;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PollStoreRequest extends FormRequest
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
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'creator_id' => 'required|exists:users,id',
            'end_date' => 'required|date_format:Y-m-d H:i:s|after:start_date',
            'is_active' => 'required|boolean',
            'allow_multiple_votes' => 'required|boolean',
            'options' => 'required|array',
            'options.*.option_text' => 'required|string|min:1|max:16',
            'options.*.display_order' => 'required|integer',
        ];
    }
    public function messages()
    {
        return [
            'title.required' => 'Judul harus diisi',
            'start_date.required' => 'Tanggal mulai harus diisi',
            'end_date.required' => 'Tenggat harus diisi',
            'creator_id.required' => 'ID Pencipta tidak ada atau tidak valid',
            'end_date.after' => 'Tenggat tidak sah',
            'is_active.required' => 'Keaktifan Petisi harus diisi',
            'allow_multiple_votes' => 'Hak pemilihan berulang harus diisi',
            'options.*.option_text.required' => 'Label pilihan harus diisi',
            'options.*.option_text.max' => 'Label pilihan terlalu panjang',
            'options.*.display_order.required' => 'Urutan tampil pilihan harus diatur',
        ];
    }
}
