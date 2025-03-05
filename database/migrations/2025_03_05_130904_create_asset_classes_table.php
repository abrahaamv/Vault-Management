<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssetClassesTable extends Migration
{
    public function up()
    {
        Schema::create('asset_classes', function (Blueprint $table) {
            $table->id();
            $table->integer('class_number')->unique();
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('asset_classes');
    }
}
