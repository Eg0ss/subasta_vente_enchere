<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PhotoAnnonce extends Model
{
    protected $fillable = ['annonce_id', 'chemin', 'ordre'];

    public function annonce(): BelongsTo
    {
        return $this->belongsTo(Annonce::class);
    }
}
