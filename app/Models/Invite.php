<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property bool $is_accepted
 * @property bool $is_rejected
 * @property User $sender
 * @property User $receiver
 * @property GameDetail $game
 */
class Invite extends Model
{
    use HasFactory;

    protected $fillable = [
        "is_accepted",
        "is_rejected",
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(GameDetail::class, "game_detail_id");
    }

    public function json(User $user): array
    {
        $target = $user->id === $this->sender->id ? $this->receiver : $this->sender;

        return [
            "id" => $this->id,
            "target" => [
                "id" => $target->id,
                "name" => $target->name,
                "image" => $target->image,
            ],
            "game" => [
                "id" => $this->game->id,
                "name" => $this->game->name,
                "image" => $this->game->image,
            ],
            "is_accepted" => $this->is_accepted,
            "is_rejected" => $this->is_rejected,
        ];
    }
}
