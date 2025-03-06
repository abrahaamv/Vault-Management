<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssetDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('asset_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('asset_id');
            $table->unsignedBigInteger('client_id');
            $table->text('details')->nullable(); 
            $table->timestamps();

            // Example foreign keys (adjust to your needs):
            // $table->foreign('asset_id')->references('id')->on('assets')->onDelete('cascade');
            // $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('asset_details');
    }
}
