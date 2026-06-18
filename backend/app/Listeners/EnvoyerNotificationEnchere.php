<?php

namespace App\Listeners;

use App\Events\NouvelleEnchereProposee;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnvoyerNotificationEnchere implements ShouldQueue
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function handle(NouvelleEnchereProposee $event): void
    {
        $vendeurId = $event->enchere->annonce->vendeur_id;
        
        $this->notificationService->notifier(
            $vendeurId,
            'nouvelle_enchere',
            "Une nouvelle enchère de {$event->enchere->montant}€ a été placée sur votre annonce '{$event->enchere->annonce->titre}'.",
            ['annonce_id' => $event->enchere->annonce_id]
        );
    }
}
