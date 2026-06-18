<?php

namespace App\Services;

use App\Models\Notification;
use App\Events\NouvelleNotification;

/**
 * Service centralisé pour la gestion des notifications.
 */
class NotificationService
{
    /**
     * Crée une notification et déclenche l'événement temps réel.
     * 
     * @param int $userId ID de l'utilisateur à notifier
     * @param string $type Type de notification (ex: 'enchere_depassee')
     * @param string $message Message lisible
     * @param array|null $data Données supplémentaires JSON
     */
    public function notifier(int $userId, string $type, string $message, ?array $data = null)
    {
        $notification = Notification::create([
            'user_id' => $userId,
            'type'    => $type,
            'message' => $message,
            'data'    => $data,
            'lu'      => false
        ]);

        // Diffusion en temps réel (via Laravel Reverb/Pusher)
        event(new NouvelleNotification($notification));

        return $notification;
    }
}
