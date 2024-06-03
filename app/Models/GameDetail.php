<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property int $steam_id
 * @property string $name
 * @property string $description
 * @property string $cover
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection<Game> $games;
 * @property Collection<Tag> $tags;
 * @property Collection<AchievementDetail> $achievements;
 */
class GameDetail extends Model
{
    use HasFactory;

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(AchievementDetail::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public static function get_by_steam_id(int $steam_id): ?self
    {
        return self::query()->where("steam_id", $steam_id)->first();
    }

    public static function exist(int $steam_id): bool
    {
        return self::get_by_steam_id($steam_id) !== null;
    }
}
