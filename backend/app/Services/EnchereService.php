<?php

namespace App\Services;

use App\Models\Annonce;
use App\Models\Enchere;
use App\Events\NouvelleEnchereProposee;
use App\Events\EnchereDepasse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Service gérant la logique des enchères.
 */
class EnchereService
{
    /**
     * Place une enchère en vérifiant que le montant est supérieur au prix actuel
     * et que l'enchérisseur n'est pas le vendeur.
     */
    public function placerEnchere(Annonce $annonce, int $userId, float $montant)
    {
        return DB::transaction(function () use ($annonce, $userId, $montant) {
            
            // 1. Vérifications
            if ($annonce->vendeur_id === $userId) {
                throw ValidationException::withMessages([
                    'montant' => ['Vous ne pouvez pas enchérir sur votre propre annonce.']
                ]);
            }

            if ($montant <= $annonce->prix_actuel) {
                throw ValidationException::withMessages([
                    'montant' => ["Le montant doit être supérieur au prix actuel ({$annonce->prix_actuel}€)."]
                ]);
            }

            if ($annonce->statut !== 'active' || $annonce->date_fin < now()) {
                throw ValidationException::withMessages([
                    'montant' => ['Cette enchère est terminée ou n\'est plus active.']
                ]);
            }

            // 2. Identifier l'ancien meilleur enchérisseur
            $ancienMeilleur = $annonce->encheres()->latest()->first();

            // 3. Créer l'enchère
            $enchere = Enchere::create([
                'annonce_id' => $annonce->id,
                'acheteur_id' => $userId,
                'montant' => $montant
            ]);

            // 4. Mettre à jour le prix actuel
            $annonce->update(['prix_actuel' => $montant]);

            // 5. Déclenchement des événements
            event(new NouvelleEnchereProposee($enchere));

            if ($ancienMeilleur && $ancienMeilleur->acheteur_id !== $userId) {
                event(new EnchereDepasse($ancienMeilleur, $montant));
            }

            return $enchere;
        });
    }
}
