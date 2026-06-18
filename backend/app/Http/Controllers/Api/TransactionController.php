<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Models\Transaction;
use App\Http\Requests\ChoisirGagnantRequest;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function choisirGagnant(ChoisirGagnantRequest $request, Annonce $annonce)
    {
        // Seul le vendeur ou l'admin peut choisir un gagnant (si besoin manuellement)
        // Mais généralement c'est automatique à la fin de l'enchère.
        
        $transaction = Transaction::updateOrCreate(
            ['annonce_id' => $annonce->id],
            [
                'gagnant_id' => $request->acheteur_id,
                'montant_final' => $request->montant_final,
                'statut_paiement' => 'en_attente'
            ]
        );

        $annonce->update(['statut' => 'terminee']);

        return response()->json($transaction);
    }
}
