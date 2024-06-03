<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function show(Request $request)
    {
        /** @var User $user */ 
        $user = $request->user();
        $games = [];
        $tags = [];

        foreach ($user->games as $game) {
            $data = $game->full();
            $games[] = $data;

            foreach ($data["tags"] as $tag) {
                if (!array_key_exists($tag, $tags)) {
                    $tags[$tag] = ["games" => 1, "name" => $tag];
                } else {
                    ++$tags[$tag]["games"];
                }
            }
        }

        foreach (Tag::MULTIPLAYER_TAGS as $tag) {
            unset($tags[$tag]);
        }

        $tags_return = [];

        foreach ($tags as $tag) {
            $tags_return[] = $tag;
        }

        rsort($tags_return);

        $selected_tags = $request->query("tags");

        if ($selected_tags === null) {
            $selected_tags = [];
        } else if (!is_array($selected_tags)) {
            $selected_tags = [$selected_tags];
        }

        return Inertia::render("Library", [
            "games" => $games,
            "tags" => $tags_return,
            "default_selected_tags" => $selected_tags,
            "status" => session("status"),
        ]);
    }
}
