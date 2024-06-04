<?php

declare(strict_types=1);

use App\Models\GameDetail;
use App\Models\Tag;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("game_detail_tag", function (Blueprint $table): void {
            $table->id();
            $table->foreignIdFor(GameDetail::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Tag::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("game_detail_tag");
    }
};
