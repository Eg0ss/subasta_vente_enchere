<?php

namespace App\Events;

use App\Models\Annonce;
use App\Models\Enchere;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VenteTerminee
{
    use Dispatchable, SerializesModels;

    public $annonce;
    public $gagnant;

    public function __construct(Annonce $annonce, Enchere $gagnant)
    {
        $this->annonce = $annonce;
        $this->gagnant = $gagnant;
    }
}
