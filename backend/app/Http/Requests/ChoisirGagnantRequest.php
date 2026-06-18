<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChoisirGagnantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'acheteur_id' => 'required|exists:users,id',
            'montant_final' => 'required|numeric|min:0.01'
        ];
    }
}
