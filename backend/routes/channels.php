<?php

use Illuminate\Support\Facades\Broadcast;

/**
 * Définition des canaux de diffusion pour Laravel Echo.
 */

// Canal privé pour les notifications utilisateur
Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Canal public pour les mises à jour en direct des enchères d'une annonce
Broadcast::channel('annonce.{id}', function () {
    return true; // Public, tout le monde peut voir les enchères monter
});
