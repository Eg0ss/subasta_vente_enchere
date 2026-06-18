<?php

namespace App\Events;

use App\Models\Enchere;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EnchereDepasse
{
    use Dispatchable, SerializesModels;

    public $ancienneEnchere;
    public $nouveauMontant;

    public function __construct(Enchere $ancienneEnchere, float $nouveauMontant)
    {
        $this->ancienneEnchere = $ancienneEnchere;
        $this->nouveauMontant = $nouveauMontant;
    }
}
