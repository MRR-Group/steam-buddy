<?php

declare(strict_types=1);

namespace App\Models;

use App\Exceptions\GameNotFoundException;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property int $steam_id
 * @property int $game_detail_id;
 * @property int $play_time
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property User $user
 * @property GameDetail $data;
 * @property Collection<Achievement> $achievements
 */
class Game extends Model
{
    use HasFactory;

    public function with_data(): array
    {
        return [
            "id" => $this->id,
            "steam_id" => $this->steam_id,
            "play_time" => $this->play_time,
            "name" => $this->data->name,
            "cover" => $this->data->cover,
            "description" => $this->data->description,
        ];
    }

    public function full(): array
    {
        $achievements = [];

        foreach ($this->achievements as $achievement) {
            $achievements[] = [
                "id" => $achievement->id,
                "steam_id" => $achievement->steam_id,
                "unlocked_at" => $achievement->unlocked_at,
                "name" => $achievement->data->name,
                "description" => $achievement->data->description,
                "icon" => $achievement->data->icon,
            ];
        }

        $tags = [];

        foreach ($this->data->tags as $tag) {
            $tags[] = $tag->name;
        }

        return [
            "id" => $this->id,
            "steam_id" => $this->steam_id,
            "play_time" => $this->play_time,
            "name" => $this->data->name,
            "cover" => $this->data->cover,
            "description" => $this->data->description,
            "achievements" => $achievements,
            "tags" => $tags,
        ];
    }

    public function with_achievements(): array {
        $achievements = [];

        foreach ($this->achievements as $achievement) {
            $data = $achievement->data;

            $achievements[] = [
                "id" => $achievement->id,
                "steam_id" => $achievement->steam_id,
                "unlocked_at" => $achievement->unlocked_at,
                "name" => $data->name,
                "description" => $data->description,
                "icon" => $data->icon,
            ];
        }

        return $achievements;
    }

    public function game_completion(array $achievements = null): float {
        $all_achievements = $this->data->achievements;

        if (is_null($achievements)) {
            $achievements = $this->with_achievements();
        }

        if (count($all_achievements) == 0) {
            return 1;
        }

        return count($achievements) / count($all_achievements);
    }

    public function similar_achievements(User $user, array $my_achievements = null): float {
        if (is_null($my_achievements)) {
            $my_achievements = $this->with_achievements();
        }

        $game = $user->games()->where(["steam_id" => $this->steam_id])->first();

        // User doesn't have that game
        if (is_null($game)) {
            return 0;
        }

        $user_achievements = $game->with_achievements();

        $my_achievements_set = array_flip(array_column($my_achievements, 'id'));
        $user_achievements_set = array_flip(array_column($user_achievements, 'id'));
        
        $common_achievements = array_intersect_key($my_achievements_set, $user_achievements_set);
        $total_unique_achievements = array_merge($my_achievements_set, $user_achievements_set);

        if (count($total_unique_achievements) == 0) {
            return 1;
        }

        return count($common_achievements) / count($total_unique_achievements);
    }

    public function with_tags(): array
    {
        return [
            "id" => $this->id,
            "name" => $this->data->name,
            "cover" => $this->data->cover,
            "tags" => $this->tags_name(),
        ];
    }

    public function tags_name(): array
    {
        $tags = [];

        foreach ($this->data->tags as $tag) {
            $tags[] = $tag->name;
        }

        return $tags;
    }

    public static function get_by_steam_id(int $steam_id): ?self
    {
        return self::query()->where("steam_id", $steam_id)->first();
    }

    public function data(): BelongsTo
    {
        return $this->belongsTo(GameDetail::class, "game_detail_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(Achievement::class);
    }
}
