<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\GameDetail;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /** The current password being used by the factory. */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "email" => fake()->unique()->safeEmail(),
            "email_verified_at" => now(),
            "description" => Str::random(100),
            "image" => fake()->imageUrl(),
            "steam_id" => Str::random(10),
            "last_fetch" => now(),
            "password" => static::$password ??= Hash::make("password"),
            "remember_token" => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            "email_verified_at" => null,
        ]);
    }

    /**
     * Indicate that the user isn't connected to steam.
     */
    public function unconnected(): static
    {
        return $this->state(fn(array $attributes) => [
            "steam_id" => null,
            "image" => null,
            "name" => null,
        ]);
    }

    /**
     * Indicates that the user has never downloaded data from Steam.
     */
    public function never_fetched(): static
    {
        return $this->state(fn(array $attributes) => [
            "last_fetch" => null,
        ]);
    }
}
