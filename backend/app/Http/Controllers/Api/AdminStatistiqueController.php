<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use App\Models\User;
use App\Models\Enchere;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminStatistiqueController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_annonces' => Annonce::count(),
            'active_annonces' => Annonce::where('statut', 'active')->count(),
            'total_encheres' => Enchere::count(),
            'total_transactions_value' => Transaction::sum('montant_final'),
            'recent_transactions' => Transaction::with(['annonce', 'gagnant'])->latest()->limit(5)->get()
        ]);
    }
}
