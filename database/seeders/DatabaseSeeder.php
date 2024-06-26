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
            "description" => fake()->realText(500),
            "last_fetch" => null,
        ]);

        User::factory()->unconnected()->create([
            "email" => "test1@example.com",
            "password" => Hash::make("test1@example.com"),
            "email_verified_at" => now(),
            "description" => fake()->realText(500),
            "last_fetch" => null,
        ]);

        User::factory()->unconnected()->create([
            "email" => "test2@example.com",
            "password" => Hash::make("test2@example.com"),
            "email_verified_at" => now(),
            "description" => fake()->realText(500),
            "last_fetch" => null,
        ]);
    }
}
