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
    public function show(Request $request, string $id)
    {
        /** @var User $user */
        $user = User::query()->where(["id" => $id])->first();

        if ($user === null) {
            throw new NotFoundHttpException();
        }

        $name = $user->name;
        $email = $user->email;
        $description = $user->description;
        $image = $user->image;

        return Inertia::render("Profile/Show", ["name" => $name, "email" => $email, "description" => $description, "image" => $image]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $name = $user->name;
        $email = $user->email;
        $description = $user->description;

        return Inertia::render("Profile/Edit", [
            "status" => session("status"),
            "name" => $name,
            "email" => $email,
            "description" => $description
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->fill($request->validated());

        $user->save();

        return Redirect::route("profile.show", ["id" => $user->id]);
    }
}
