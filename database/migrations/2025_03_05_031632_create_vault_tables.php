<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('asset_classes', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('class_number')->unique();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            // Assuming "users" table exists and 'id' is the PK
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('asset_class_id')->constrained('asset_classes')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('asset_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained('assets')->onDelete('cascade');
             $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
           $table->json('details');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('asset_details');
        Schema::dropIfExists('assets');
        Schema::dropIfExists('asset_classes');
    }
};
