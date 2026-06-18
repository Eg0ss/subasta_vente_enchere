<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnonceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'description' => $this->description,
            'prix_depart' => $this->prix_depart,
            'prix_actuel' => $this->prix_actuel,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'livraison' => $this->livraison,
            'statut' => $this->statut,
            'vendeur' => new UserResource($this->whenLoaded('vendeur')),
            'categorie' => $this->whenLoaded('categorie'),
            'photos' => $this->whenLoaded('photos'),
            'encheres_count' => $this->encheres_count ?? $this->encheres()->count(),
            'created_at' => $this->created_at,
        ];
    }
}
