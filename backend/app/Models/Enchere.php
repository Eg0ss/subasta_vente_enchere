<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enchere extends Model
{
    protected $fillable = ['annonce_id', 'acheteur_id', 'montant'];

    public function annonce(): BelongsTo
    {
        return $this->belongsTo(Annonce::class);
    }

    public function acheteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'acheteur_id');
    }
}
