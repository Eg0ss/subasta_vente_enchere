<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RejeterAnnonceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'motif' => 'required|string|min:5'
        ];
    }
}
