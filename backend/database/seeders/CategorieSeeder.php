<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Électronique',
            'Véhicules',
            'Immobilier',
            'Mode',
            'Maison & Jardin',
            'Loisirs',
        ];

        foreach ($categories as $nom) {
            Categorie::create(['nom' => $nom]);
        }

        // Exemple de sous-catégorie
        $electro = Categorie::where('nom', 'Électronique')->first();
        Categorie::create(['nom' => 'Smartphones', 'parent_id' => $electro->id]);
        Categorie::create(['nom' => 'Ordinateurs', 'parent_id' => $electro->id]);
    }
}
