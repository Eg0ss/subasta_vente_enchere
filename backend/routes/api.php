<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AnnonceController;
use App\Http\Controllers\Api\EnchereController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AdminAnnonceController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\AdminStatistiqueController;
use Illuminate\Support\Facades\Route;

/**
 * Routes de l'API Subasta - Version Complète.
 */

// --- ROUTES PUBLIQUES ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/annonces', [AnnonceController::class, 'index']);
Route::get('/annonces/{annonce}', [AnnonceController::class, 'show']);
Route::get('/annonces/{annonce}/historique', [EnchereController::class, 'historique']);
Route::get('/categories', [CategorieController::class, 'index']);

// --- ROUTES PROTÉGÉES (Auth & Compte Actif) ---
Route::middleware(['auth:sanctum', 'active'])->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Annonces & Enchères
    Route::post('/annonces', [AnnonceController::class, 'store']);
    Route::post('/annonces/{annonce}/encherir', [EnchereController::class, 'proposer']);

    // Transactions
    Route::post('/annonces/{annonce}/choisir-gagnant', [TransactionController::class, 'choisirGagnant']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{notification}/lu', [NotificationController::class, 'marquerLu']);
    Route::post('/notifications/tout-lu', [NotificationController::class, 'marquerToutLu']);

    // --- ROUTES ADMIN ---
    Route::middleware('admin')->prefix('admin')->group(function () {
        
        // Dashboard
        Route::get('/stats', [AdminStatistiqueController::class, 'index']);

        // Gestion Annonces
        Route::patch('/annonces/{annonce}/valider', [AdminAnnonceController::class, 'valider']);
        Route::patch('/annonces/{annonce}/rejeter', [AdminAnnonceController::class, 'rejeter']);

        // Gestion Categories
        Route::apiResource('categories', CategorieController::class)->except(['index']);

        // Gestion Utilisateurs
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::patch('/users/{user}/suspendre', [AdminUserController::class, 'suspendre']);
        Route::patch('/users/{user}/activer', [AdminUserController::class, 'activer']);
    });
});
