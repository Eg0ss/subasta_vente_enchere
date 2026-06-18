<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = ['annonce_id', 'gagnant_id', 'montant_final', 'statut_paiement'];

    public function annonce(): BelongsTo
    {
        return $this->belongsTo(Annonce::class);
    }

    public function gagnant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'gagnant_id');
    }
}
