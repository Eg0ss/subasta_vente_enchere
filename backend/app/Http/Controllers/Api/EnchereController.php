<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Services\EnchereService;
use App\Http\Resources\EnchereResource;
use Illuminate\Http\Request;

/**
 * Contrôleur pour la gestion des enchères.
 */
class EnchereController extends Controller
{
    protected $enchereService;

    public function __construct(EnchereService $enchereService)
    {
        $this->enchereService = $enchereService;
    }

    /**
     * Propose une nouvelle enchère sur une annonce.
     */
    public function proposer(Request $request, Annonce $annonce)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:1'
        ]);

        $enchere = $this->enchereService->placerEnchere(
            $annonce,
            $request->user()->id,
            $validated['montant']
        );

        return new EnchereResource($enchere);
    }

    /**
     * Historique des enchères pour une annonce spécifique.
     */
    public function historique(Annonce $annonce)
    {
        $encheres = $annonce->encheres()
            ->with('acheteur')
            ->latest()
            ->paginate(20);

        return EnchereResource::collection($encheres);
    }
}
