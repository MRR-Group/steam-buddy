<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    public function show(string $id)
    {
        /** @var User $user */
        $user = User::query()->where(["id" => $id])->first();

        if ($user === null) {
            throw new NotFoundHttpException();
        }

        $games = [];
        $tags = [];

        foreach ($user->games as $game) {
            $data = $game->full();
            $games[] = $data;
            
            foreach ($data["tags"] as $tag) {
                if (!array_key_exists($tag, $tags)) {
                    $tags[$tag] = ["games" => 1, "name" => $tag];
                }
                else {
                    $tags[$tag]["games"] += 1;
                }
            }
        }

        foreach(Tag::MULTIPLAYER_TAGS as $tag) {
            unset($tags[$tag]);
        }

        $tags_return = [];
        
        foreach($tags as $tag) {
            $tags_return[] = $tag;
        }
        
        rsort($tags_return);

        return Inertia::render("Profile/Show", [
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "description" => $user->description,
            "image" => $user->image,
            "games" => $games,
            "tags" => $tags_return,
        ]);
    }

    public function edit(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render("Profile/Edit", [
            "status" => session("status"),
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "description" => $user->description,
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->fill($request->validated());
        $user->save();

        return Redirect::route("profile.show", ["id" => $user->id]);
    }
}
