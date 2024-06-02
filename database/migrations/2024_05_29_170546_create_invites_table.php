<?php

declare(strict_types=1);

use App\Models\GameDetail;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("invites", function (Blueprint $table): void {
            $table->id();
            $table->timestamps();
            $table->foreignId("sender_id")->constrained("users")->cascadeOnDelete();
            $table->foreignId("receiver_id")->constrained("users")->cascadeOnDelete();
            $table->foreignIdFor(GameDetail::class)->constrained()->cascadeOnDelete();
            $table->boolean("is_accepted")->default(false);
            $table->boolean("is_rejected")->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("invites");
    }
};
