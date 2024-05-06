<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Tag extends Model
{
    use HasFactory;

    protected static $MULTIPLAYER_TAGS = [
        "Local Co-Op",
        "Local Multiplayer",
        "4 Player Local",
        "Co-op Campaign",
        "Co-op",
        "Multiplayer", 
        "Massively Multiplayer", 
        "Online Co-Op", 
        "Online PvP", 
        "LAN Co-Op", 
        "Multi-Player", 
        "MMORPG",
        "MOBA",
        "Asynchronous Multiplayer",
        "PvE",
        "PvP"
    ];
    
    protected $fillable = ['name'];

    public function game(): BelongsToMany
    {
        return $this->belongsToMany(GameDetail::class);
    }

    public function is_multiplayer() {
        return in_array($this->name, self::$MULTIPLAYER_TAGS);
    }

    public static function get_by_name(string $name): ?self {
        return self::where('name', $name)->first();
    }

    public static function get_by_names(array $names) {
        return self::whereIn('name', $names)->get();
    }

    public static function exist(string $name) : bool {
        return self::get_by_name($name) != null;
    }
}