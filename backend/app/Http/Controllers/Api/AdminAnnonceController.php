<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Http\Resources\AnnonceResource;
use App\Services\NotificationService;
use Illuminate\Http\Request;

/**
 * Contrôleur réservé aux administrateurs pour la gestion des annonces.
 */
class AdminAnnonceController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Valide une annonce pour qu'elle devienne 'active'.
     */
    public function valider(Annonce $annonce)
    {
        $annonce->update([
            'statut' => 'active',
            'date_debut' => now(), // On active l'enchère immédiatement
        ]);

        $this->notificationService->notifier(
            $annonce->vendeur_id,
            'annonce_validee',
            "Votre annonce '{$annonce->titre}' a été validée et est maintenant en ligne.",
            ['annonce_id' => $annonce->id]
        );

        return new AnnonceResource($annonce);
    }

    /**
     * Rejette une annonce avec un motif obligatoire.
     */
    public function rejeter(Request $request, Annonce $annonce)
    {
        $validated = $request->validate([
            'motif' => 'required|string|min:10'
        ]);

        $annonce->update(['statut' => 'rejete']);

        $this->notificationService->notifier(
            $annonce->vendeur_id,
            'annonce_rejetee',
            "Votre annonce '{$annonce->titre}' a été refusée. Motif : {$validated['motif']}",
            ['annonce_id' => $annonce->id]
        );

        return response()->json(['message' => 'Annonce rejetée.']);
    }
}
