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
 * @property Carbon $last_fetch
 * @property Carbon $email_verified_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection<Game> $games
 * @property Collection<Invite> $sent_invites
 * @property Collection<Invite> $received_invites
 */
class User extends Authenticatable implements MustVerifyEmail
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
        "name",
        "description",
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
        $this->image = $this->load_bigger_image($avatar);
        $this->save();
    }

    public function json_games()
    {
        $games = [];
        $tags = [];

        foreach ($this->games as $game) {
            $data = $game->json();
            $games[] = $data;

            foreach ($data["tags"] as $tag) {
                if (!array_key_exists($tag, $tags)) {
                    $tags[$tag] = ["name" => $tag, "games" => 1];
                } else {
                    ++$tags[$tag]["games"];
                }
            }
        }

        return [
            "games" => $games,
            "tags" => $this->sort_tags($tags),
        ];
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function sent_invites(): HasMany
    {
        return $this->hasMany(Invite::class, "sender_id");
    }

    public function received_invites(): HasMany
    {
        return $this->hasMany(Invite::class, "receiver_id");
    }

    protected function sort_tags(array $tags): array
    {
        foreach (Tag::MULTIPLAYER_TAGS as $tag) {
            unset($tags[$tag]);
        }

        sort($tags);
        $result = [];

        foreach ($tags as $tag) {
            $result[] = $tag;
        }

        return $result;
    }

    protected function load_bigger_image(string $image)
    {
        // 128x128
        if (str_contains($image, "_full")) {
            return $image;
        }

        // 64x64
        if (str_contains($image, "_medium")) {
            return str_replace("_medium", "_full", $image);
        }

        // 32x32
        return str_replace(".jpg", "_full.jpg", $image);
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
