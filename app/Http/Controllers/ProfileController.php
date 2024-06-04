<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    public function show(string $id, Request $request)
    {
        $selected_tags = $request->query("tags");

        if ($selected_tags === null) {
            $selected_tags = [];
        } else if (!is_array($selected_tags)) {
            $selected_tags = [$selected_tags];
        }

        /** @var User $user */
        $user = User::query()->where(["id" => $id])->first();

        if ($user === null) {
            throw new NotFoundHttpException();
        }

        ["games" => $games, "tags" => $tags] = $user->json_games();
        $is_owner = $user->id === $request->user()->id;

        return Inertia::render("Profile/Show", [
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "description" => $user->description,
            "image" => $user->image,
            "games" => $games,
            "tags" => $tags,
            "default_selected_tags" => $selected_tags,
            "is_owner" => $is_owner,
        ]);
    }

    public function edit(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render("Profile/Edit", [
            "status" => session("status"),
            "id" => $user->id,
            "image" => $user->image,
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
