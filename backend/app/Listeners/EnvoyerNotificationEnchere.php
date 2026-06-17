<?php

namespace App\Listeners;

use App\Events\NouvelleEnchereProposee;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class EnvoyerNotificationEnchere
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NouvelleEnchereProposee $event): void
    {
        //
    }
}
