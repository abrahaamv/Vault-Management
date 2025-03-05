<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssetsTable extends Migration
{
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('asset_class_id');
            $table->timestamps();

            // Example foreign keys (adjust to your needs):
            // $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('asset_class_id')->references('id')->on('asset_classes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('assets');
    }
}
