<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Vérifie que l'utilisateur connecté a le rôle 'admin'.
 */
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Accès refusé. Réservé aux administrateurs.'
            ], 403);
        }
        return $next($request);
    }
}
