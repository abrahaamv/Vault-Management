<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'asset_class_id',
    ];

    public function assetClass()
    {
        return $this->belongsTo(AssetClass::class, 'asset_class_id');
    }

    public function assetDetail()
    {
        return $this->hasOne(AssetDetail::class);
    }
}
