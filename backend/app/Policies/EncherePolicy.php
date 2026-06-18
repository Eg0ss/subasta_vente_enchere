<?php

namespace App\Policies;

use App\Models\Annonce;
use App\Models\User;

class EncherePolicy
{
    public function create(User $user, Annonce $annonce): bool
    {
        // On ne peut pas enchérir sur son propre article
        return $user->id !== $annonce->vendeur_id;
    }
}
