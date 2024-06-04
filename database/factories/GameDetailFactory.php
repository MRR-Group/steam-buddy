<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tag>
 */
class GameDetailFactory extends Factory
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
            "name" => fake()->word(),
            "description" => fake()->text(),
            "cover" => fake()->imageUrl(),
            "updated_at" => now(),
            "created_at" => now(),
        ];
    }

    public function steam_id(int $steam_id): static
    {
        return $this->state(fn(array $attributes) => [
            "steam_id" => $steam_id,
        ]);
    }
}
