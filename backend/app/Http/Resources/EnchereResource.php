<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnchereResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'annonce_id' => $this->annonce_id,
            'acheteur' => new UserResource($this->whenLoaded('acheteur')),
            'montant' => $this->montant,
            'created_at' => $this->created_at,
        ];
    }
}
