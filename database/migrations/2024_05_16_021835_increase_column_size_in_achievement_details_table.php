<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::table("achievement_details", function (Blueprint $table): void {
            $table->string("description", 1024)->change();
            $table->string("icon", 512)->change();
        });
    }

    public function down(): void
    {
        Schema::table("achievement_details", function (Blueprint $table): void {
            $table->string("description", 255)->change();
            $table->string("icon", 255)->change();
        });
    }
};
