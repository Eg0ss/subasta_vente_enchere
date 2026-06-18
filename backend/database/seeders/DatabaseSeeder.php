<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

/**
 * Seeder principal de l'application.
 * Initialise les rôles et crée les utilisateurs de test par défaut.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Création des rôles via Spatie
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $membreRole = Role::create(['name' => 'membre', 'guard_name' => 'web']);

        // Création de l'utilisateur Administrateur
        $admin = User::create([
            'name' => 'Admin Subasta',
            'email' => 'admin@subasta.fr',
            'password' => Hash::make('admin'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole($adminRole);

        // Création de l'utilisateur Membre
        $membre = User::create([
            'name' => 'Membre Demo',
            'email' => 'membre@subasta.fr',
            'password' => Hash::make('demo'),
            'email_verified_at' => now(),
        ]);
        $membre->assignRole($membreRole);
    }
}
