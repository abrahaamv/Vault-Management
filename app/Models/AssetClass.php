<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_number',
        'name',
    ];

    // Example relationship (if you want to link to assets):
    public function assets()
    {
        return $this->hasMany(Asset::class);
    }
}
