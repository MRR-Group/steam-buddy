<?php

declare(strict_types=1);

namespace App\Http\Controllers\Steam;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class SteamConnectionController extends Controller
{
    public function show(): Response
    {
        return Inertia::render("Steam/Connect", ["status" => session("status")]);
    }

    public function redirect(Socialite $socialite): RedirectResponse
    {
        return $socialite->driver("steam")->redirect();
    }

    public function callback(Request $request, Socialite $socialite): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        try {
            $data = $socialite->driver("steam")->user();
        } catch (Exception $e) {
            return Redirect::route("steam.connect")->with("status", "Cannot connect your Steam account to our service, please try again later.");
        }

        $user->load_steam_data($data->id, $data->nickname, $data->avatar);

        return Redirect::route("steam.fetch")->with("status", "Your steam account has been successfully connected to our service.");
    }
}
