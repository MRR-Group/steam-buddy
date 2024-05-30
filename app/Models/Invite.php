<?php

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

    function sender(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function game(): BelongsTo
    {
        return $this->belongsTo(GameDetail::class, 'game_detail_id');
    }

    function json(): array
    {
        return [
            'id'=>$this->id,
            'sender'=>[
                'id'=>$this->sender->id,
                'name'=>$this->sender->name,
            ],
            'receiver'=>[
                'id'=>$this->receiver->id,
                'name'=>$this->receiver->name,
            ],
            'game'=>[
                'id'=>$this->game->id,
                'name'=>$this->game->name,
            ],
            'is_accepted'=>$this->is_accepted,
            'is_rejected'=>$this->is_rejected,
        ];
    }
}
