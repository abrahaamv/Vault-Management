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
     * This cast tells Laravel to automatically store/retrieve
     * the `details` attribute as JSON. So if we pass an array,
     * it will store an array in the DB (as valid JSON).
     */
    protected $casts = [
        'details' => 'array',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}
