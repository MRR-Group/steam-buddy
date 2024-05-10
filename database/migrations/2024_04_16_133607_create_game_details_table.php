<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("game_details", function (Blueprint $table): void {
            $table->id();
            $table->timestamps();
            $table->integer("steam_id");
            $table->string("name");
            $table->longText("description");
            $table->string("cover");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("game_details");
    }
};
