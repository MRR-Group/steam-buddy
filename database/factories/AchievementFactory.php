<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tag>
 */
class AchievementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "steam_id" => str(fake()->randomNumber()) . '/' . fake()->word(),
            "unlocked_at" => now(),
            "updated_at" => now(),
            "created_at" => now(),
        ];
    }

    public function steam_id(int $game_id, string $achievement_name): static
    {
        return $this->state(fn(array $attributes) => [
            "steam_id" => str($game_id) . '/' . $achievement_name,
        ]);
    }
}
