<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $steam_id
 * @property int $game_data_id;
 * @property int $play_time
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Game extends Model
{
    use HasFactory;

    public function with_data(): array {
        /** @var GameDetail $data */
        $data = $this->data()->get()->first(); 

        return [ 
            "id" => $this->id,
            "steam_id" => $this->steam_id,
            "play_time" => $this->play_time,
            "name" => $data->name,
            "cover" => $data->cover,
            "description" => $data->description,
        ];
    }

    public function full(): array {
        /** @var GameDetail $data */
        $data = $this->data()->get()->first(); 
        $achievements = [];

        foreach($this->achievements()->get() as $achievement) {
            $achievement_data = $achievement->data()->get()->first();

            array_push($achievements, [
                "id" => $achievement->id,
                "steam_id" => $achievement->steam_id,
                "unlocked_at" => $achievement->unlocked_at,
                "name" => $achievement_data->name,
                "description" => $data->description,
                "icon" => $achievement_data->icon,
            ]);
        }

        $tags = [];

        foreach($data->tags as $tag) {
            array_push($tags, $tag->name);
        }

        return [ 
            "id" => $this->id,
            "steam_id" => $this->steam_id,
            "play_time" => $this->play_time,
            "name" => $data->name,
            "cover" => $data->cover,
            "description" => $data->description,
            "achievements" => $achievements,
            "tags" => $tags,
        ];
    }

    public static function get_by_steam_id(int $steam_id): ?self {
        return Game::where('steam_id', $steam_id)->first();
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
