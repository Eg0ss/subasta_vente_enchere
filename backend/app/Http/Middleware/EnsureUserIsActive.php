<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Bloque les utilisateurs dont le compte est suspendu.
 */
class EnsureUserIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->statut === 'suspendu') {
            return response()->json([
                'message' => 'Votre compte est suspendu. Veuillez contacter l\'administrateur.'
            ], 403);
        }

        return $next($request);
    }
}
