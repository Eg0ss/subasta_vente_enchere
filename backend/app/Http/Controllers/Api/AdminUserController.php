<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

/**
 * Gestion des utilisateurs par l'administrateur.
 */
class AdminUserController extends Controller
{
    /**
     * Suspend un utilisateur.
     */
    public function suspendre(User $user)
    {
        $user->update(['statut' => 'suspendu']);
        
        // On révoque ses tokens pour le déconnecter immédiatement
        $user->tokens()->delete();

        return response()->json([
            'message' => "L'utilisateur {$user->name} a été suspendu.",
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Réactive un compte utilisateur.
     */
    public function activer(User $user)
    {
        $user->update(['statut' => 'actif']);

        return response()->json([
            'message' => "Le compte de {$user->name} a été réactivé.",
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Liste tous les utilisateurs (pour le dashboard admin).
     */
    public function index()
    {
        return UserResource::collection(User::paginate(20));
    }
}
