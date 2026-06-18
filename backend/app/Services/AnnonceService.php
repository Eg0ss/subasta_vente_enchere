<?php

namespace App\Services;

use App\Models\Annonce;

class AnnonceService
{
    /**
     * Gère les transitions de statut d'une annonce.
     */
    public function transitionStatut(Annonce $annonce, string $nouveauStatut)
    {
        $statutsValides = ['brouillon', 'attente', 'active', 'terminee', 'rejete'];

        if (!in_array($nouveauStatut, $statutsValides)) {
            throw new \InvalidArgumentException("Statut invalide : $nouveauStatut");
        }

        $annonce->update(['statut' => $nouveauStatut]);
        
        return $annonce;
    }
}
