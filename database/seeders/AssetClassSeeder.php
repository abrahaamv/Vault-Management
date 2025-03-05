<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AssetClass;

class AssetClassSeeder extends Seeder
{
    public function run()
    {
        $classes = [
            ['class_number' => 1,  'name' => 'Bank account'],
            ['class_number' => 2,  'name' => 'Investment account'],
            ['class_number' => 3,  'name' => 'Registered account'],
            ['class_number' => 4,  'name' => 'Crypto'],
            ['class_number' => 5,  'name' => 'Online business'],
            ['class_number' => 6,  'name' => 'Domain names'],
            ['class_number' => 7,  'name' => 'Insurance policies'],
            ['class_number' => 8,  'name' => 'Vehicles'],
            ['class_number' => 9,  'name' => 'Real estate'],
            ['class_number' => 10, 'name' => 'Private company shares'],
            ['class_number' => 11, 'name' => 'Safe deposit box'],
            ['class_number' => 12, 'name' => 'Firearms'],
            ['class_number' => 13, 'name' => 'Credit cards'],
            ['class_number' => 14, 'name' => 'Loans (payable)'],
            ['class_number' => 15, 'name' => 'Receivables'],
            ['class_number' => 16, 'name' => 'Significant assets'],
            ['class_number' => 17, 'name' => 'Social media accounts'],
            ['class_number' => 18, 'name' => 'Technology'],
            ['class_number' => 19, 'name' => 'Intellectual property (patents, etc)'],
            ['class_number' => 20, 'name' => 'Email accounts'],
        ];

        foreach ($classes as $class) {
            AssetClass::updateOrCreate(
                ['class_number' => $class['class_number']],
                ['name' => $class['name']]
            );
        }
    }
}
