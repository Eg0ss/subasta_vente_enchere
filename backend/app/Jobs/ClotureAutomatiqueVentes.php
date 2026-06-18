<?php

namespace App\Jobs;

use App\Models\Annonce;
use App\Models\Transaction;
use App\Events\VenteTerminee;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ClotureAutomatiqueVentes implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $annoncesTerminees = Annonce::where('statut', 'active')
            ->where('date_fin', '<=', now())
            ->get();

        foreach ($annoncesTerminees as $annonce) {
            $derniereEnchere = $annonce->encheres()->latest()->first();

            if ($derniereEnchere) {
                Transaction::create([
                    'annonce_id' => $annonce->id,
                    'gagnant_id' => $derniereEnchere->acheteur_id,
                    'montant_final' => $derniereEnchere->montant,
                    'statut_paiement' => 'en_attente'
                ]);

                event(new VenteTerminee($annonce, $derniereEnchere));
            }

            $annonce->update(['statut' => 'terminee']);
        }
    }
}
