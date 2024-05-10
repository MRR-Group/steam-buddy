<?php

declare(strict_types=1);

use App\Models\GameDetail;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("games", function (Blueprint $table): void {
            $table->id();
            $table->timestamps();
            $table->integer("steam_id");
            $table->integer("play_time");
            $table->foreignIdFor(GameDetail::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("games");
    }
};
