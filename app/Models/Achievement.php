<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $steam_id
 * @property int $game_id
 * @property int $achievement_data_id
 * @property Carbon $unlocked_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property AchievementDetail $data
 * @property Game $game
 */
class Achievement extends Model
{
    use HasFactory;

    public function set_steam_id(int $game_id, string $name): void
    {
        $this->steam_id = $this->create_achievement_id($game_id, $name);
    }

    public function data(): BelongsTo
    {
        return $this->belongsTo(AchievementDetail::class, "achievement_detail_id");
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    protected function create_achievement_id(int $game_id, string $achievement_steam_name): string
    {
        return str($game_id) . "/" . $achievement_steam_name;
    }
}
