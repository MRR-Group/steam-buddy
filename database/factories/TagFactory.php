<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "updated_at" => now(),
            "created_at" => now(),
        ];
    }

    public function name(string $name): static
    {
        return $this->state(fn(array $attributes) => [
            "name" => $name,
        ]);
    }

    public function coop(): static
    {
        return $this->state(fn(array $attributes) => [
            "name" => "Co-op",
        ]);
    }
}
