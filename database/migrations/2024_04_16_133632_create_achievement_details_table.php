<?php

declare(strict_types=1);

use App\Models\GameDetail;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("achievement_details", function (Blueprint $table): void {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("steam_id");
            $table->foreignIdFor(GameDetail::class)->constrained()->cascadeOnDelete();
            $table->string("description");
            $table->string("icon");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("achievement_details");
    }
};
