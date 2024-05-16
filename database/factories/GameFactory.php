<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\GameDetail;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tag>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "steam_id" => fake()->randomNumber(),
            "play_time" => fake()->randomNumber(),
            "updated_at" => now(),
            "created_at" => now(),
        ];
    }

    public function steam_id(int $steam_id): static
    {
        return $this->state(fn(array $attributes) => [
            "steam_id" => $steam_id,
            "game_detail_id" => GameDetail::factory()->steam_id($steam_id),
            "user_id" => User::factory(),
        ]);
    }
}
