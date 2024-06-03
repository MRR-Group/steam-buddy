<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LibraryController extends Controller
{
    public function show(Request $request): Response
    {
        /** @var User $user */ 
        $user = $request->user();
        $selected_tags = $request->query("tags");
        
        if ($selected_tags === null) {
            $selected_tags = [];
        } else if (!is_array($selected_tags)) {
            $selected_tags = [$selected_tags];
        }
        
        ["games" => $games, "tags" => $tags] = $this->get_games($user);

        return Inertia::render("Library", [
            "games" => $games,
            "tags" => $tags,
            "default_selected_tags" => $selected_tags,
            "status" => session("status"),
        ]);
    }

    protected function get_games(User $user): array {
        $games = [];
        $tags = [];

        foreach ($user->games as $game) {
            $data = $game->full();
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
            "tags" => $this->sort_tags($tags)
        ];
    }

    protected function sort_tags(array $tags): array {
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
}
