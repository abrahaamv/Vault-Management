<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'client_id',
        'details',
    ];

      /**
     * This tells Eloquent to automatically encrypt/decrypt
     * the `details` attribute as an array.
     */
   protected $casts = [
        'details' => 'encrypted:array',
    ];


    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}
