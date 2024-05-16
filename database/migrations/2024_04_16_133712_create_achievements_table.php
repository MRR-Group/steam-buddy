<?php

declare(strict_types=1);

use App\Models\AchievementDetail;
use App\Models\Game;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("achievements", function (Blueprint $table): void {
            $table->id();
            $table->timestamps();
            $table->string("steam_id");
            $table->timestamp("unlocked_at");
            $table->foreignIdFor(Game::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(AchievementDetail::class)->constrained()->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("achievements");
    }
};
