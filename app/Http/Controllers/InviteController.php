<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\GameNotFoundException;
use App\Exceptions\InvalidInviteDataException;
use App\Exceptions\InviteNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Http\Requests\InviteUpdateRequest;
use App\Mail\InviteAcceptedNotification;
use App\Mail\InviteReceivedNotification;
use App\Models\GameDetail;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InviteController extends Controller
{
    public function send_invite(int $user_id, int $game_id, Request $request)
    {
        $target_user = User::query()->where(["id" => $user_id])->first();
        $game = GameDetail::query()->where(["steam_id" => $game_id])->first();

        if ($target_user === null) {
            throw new UserNotFoundException();
        }

        if ($game === null) {
            throw new GameNotFoundException();
        }

        $invite = new Invite();
        $invite->game()->associate($game);
        $invite->sender()->associate($request->user());
        $invite->receiver()->associate($target_user);
        $invite->save();

        Mail::to($invite->receiver->email)->send(new InviteReceivedNotification($invite));

        return Redirect::route("invite.show")->with("status", "Request sent to " . $target_user->name);
    }

    public function show(Request $request)
    {
        $user = $request->user();

        $sent_invites = [];
        $received_invites = [];
        $accepted_invites = [];

        foreach ($user->sent_invites as $invite) {
            $json = $invite->json($user);

            if ($invite->is_accepted) {
                $json["steam_id"] = $invite->receiver->steam_id;
                $accepted_invites[] = $json;
            } else {
                $sent_invites[] = $json;
            }
        }

        foreach ($user->received_invites as $invite) {
            $json = $invite->json($user);

            if ($invite->is_accepted) {
                $json["steam_id"] = $invite->sender->steam_id;
                $accepted_invites[] = $json;
            } else if (!$invite->is_rejected) {
                $received_invites[] = $json;
            }
        }

        return Inertia::render("Invite/Show", [
            "user" => ["id" => $user->id, "email" => $user->email, "name" => $user->name],
            "sent" => $sent_invites,
            "received" => $received_invites,
            "accepted" => $accepted_invites,
            "status" => session("status"),
        ]);
    }

    public function update(InviteUpdateRequest $request, int $id)
    {
        $invite = Invite::query()->where(["id" => $id])->first();

        if ($invite === null) {
            throw new InviteNotFoundException();
        }

        $data = $request->validated();

        if ($request->validated("is_accepted") && $request->validated("is_rejected")) {
            throw new InvalidInviteDataException();
        }

        $invite->fill($data);
        $invite->save();

        $status = $invite->is_accepted ? "accepted" : "rejected";

        if ($invite->is_accepted) {
            Mail::to($invite->sender->email)->send(new InviteAcceptedNotification($invite));
        }

        return Redirect::route("invite.show")->with("status", $status . " invite from " . $invite->sender->name);
    }

    public function remove(int $id)
    {
        $invite = Invite::query()->where(["id" => $id])->first();

        if ($invite === null) {
            throw new InviteNotFoundException();
        }

        $invite->delete();

        return Redirect::route("invite.show")->with("status", "Deleted invite from " . $invite->sender->name);
    }
}
