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

    protected function prepareForValidation()
    {
        $poll = $this->route('poll');
        $this->merge([
            'poll_id' => $poll instanceof \App\Models\Poll ? $poll->id : $poll,
        ]);
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
            // No user_id: the voter is always Auth::id() (see VoteService::CastVote).
            'option_id' => 'required|exists:poll_options,id',
        ];
    }
    public function messages()
    {
        return [
            'poll_id.required' => 'Polling tidak ada atau tidak valid',
            'option_id.required' => 'Pilihan ada atau tidak valid',
        ];
    }
}
