<?php

namespace App\Policies;

use App\Models\Annonce;
use App\Models\User;

class AnnoncePolicy
{
    public function update(User $user, Annonce $annonce): bool
    {
        return $user->id === $annonce->vendeur_id || $user->role === 'admin';
    }

    public function delete(User $user, Annonce $annonce): bool
    {
        return $user->id === $annonce->vendeur_id || $user->role === 'admin';
    }
}
