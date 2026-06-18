<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

/**
 * API pour permettre aux utilisateurs de consulter leurs notifications.
 */
class NotificationController extends Controller
{
    /**
     * Liste les notifications de l'utilisateur connecté.
     */
    public function index(Request $request)
    {
        return $request->user()->notifications()
            ->latest()
            ->paginate(15);
    }

    /**
     * Marque une notification comme lue.
     */
    public function marquerLu(Notification $notification)
    {
        // On vérifie que la notification appartient bien à l'utilisateur
        if ($notification->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        $notification->update(['lu' => true]);

        return response()->json(['message' => 'Marquée comme lue.']);
    }

    /**
     * Marque toutes les notifications comme lues d'un coup.
     */
    public function marquerToutLu(Request $request)
    {
        $request->user()->notifications()
            ->where('lu', false)
            ->update(['lu' => true]);

        return response()->json(['message' => 'Toutes les notifications sont marquées comme lues.']);
    }
}
