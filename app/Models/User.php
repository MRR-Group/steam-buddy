<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $description
 * @property string $image
 * @property string $steam_id
 * @property string $password
 * @property Carbon $last_fetched
 * @property Carbon $email_verified_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection<Game> $games;
 */class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "email",
        "password",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        "remember_token",
    ];

    public function load_steam_data(string $steam_id, string $nickname, string $avatar): void
    {
        $this->steam_id = $steam_id;
        $this->name = $nickname;
        $this->image = $avatar;
        $this->save();
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            "last_fetched" => "datetime",
            "email_verified_at" => "datetime",
            "password" => "hashed",
        ];
    }
}
