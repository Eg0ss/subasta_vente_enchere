<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->decimal('prix_depart', 12, 2);
            $table->decimal('prix_actuel', 12, 2);
            $table->dateTime('date_debut');
            $table->dateTime('date_fin');
            $table->boolean('livraison')->default(false);
            $table->enum('statut', ['brouillon', 'attente', 'active', 'terminee', 'rejete'])->default('brouillon');
            $table->foreignId('vendeur_id')->constrained('users');
            $table->foreignId('categorie_id')->constrained('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
