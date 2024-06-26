<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property string $steam_id
 * @property string $name
 * @property string $description
 * @property string $icon
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property GameDetail $game
 * @property Collection<Achievement> $achievements
 */
class AchievementDetail extends Model
{
    use HasFactory;

    public function set_steam_id(int $game_id, string $name): void
    {
        $this->steam_id = self::create_achievement_id($game_id, $name);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(Achievement::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(GameDetail::class, "game_detail_id");
    }

    public static function get_by_name(int $game_id, string $achievement_steam_name): ?self
    {
        $id = self::create_achievement_id($game_id, $achievement_steam_name);

        return self::where("steam_id", $id)->first();
    }

    public static function exist(int $game_id, $achievement_steam_name): bool
    {
        return self::get_by_name($game_id, $achievement_steam_name) !== null;
    }

    protected static function create_achievement_id(int $game_id, string $achievement_steam_name): string
    {
        return str($game_id) . "/" . $achievement_steam_name;
    }
}
