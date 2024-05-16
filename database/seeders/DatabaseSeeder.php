<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->unconnected()->create([
            "email" => "test@example.com",
            "password" => Hash::make("test@example.com"),
            "email_verified_at" => now(),
            "last_fetch" => null,
        ]);
    }
}
