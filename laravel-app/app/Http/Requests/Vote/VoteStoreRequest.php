<?php

namespace App\Http\Requests\Vote;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class VoteStoreRequest extends FormRequest
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
            'poll_id' => 'required|exists:polls,id',
            'user_id' => 'nullable|exists:users,id',
            'option_id' => 'required|exists:poll_options,id',
        ];
    }
    public function messages()
    {
        return [
            'poll_id.required' => 'Polling tidak ada atau tidak valid',
            'user_id.exists' => 'User tidak valid',
            'option_id.required' => 'Pilihan ada atau tidak valid',
        ];
    }
}
