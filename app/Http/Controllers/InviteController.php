<?php

namespace App\Http\Controllers;

use App\Exceptions\GameNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\GameDetail;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InviteController extends Controller
{
    public function send_invite(int $user_id, int $game_id, Request $request)
    {
        $target_user = User::query()->where(['id'=>$user_id])->first();
        $game = GameDetail::query()->where(['id'=>$game_id])->first();

        if(is_null($target_user))
        {
            throw new UserNotFoundException();
        }

        if(is_null($game))
        {
            throw new GameNotFoundException();
        }

        $invite = new Invite();
        $invite->game()->associate($game);
        $invite->sender()->associate($request->user());
        $invite->receiver()->associate($target_user);
        $invite->save();

        return Redirect::route("invite.show")->with("status", "Request sent to " . $target_user->name);
    }

    public function show(Request $request)
    {
        $user = $request->user();

        $sent_invites = [];
        $received_invites = [];

        foreach($user->sent_invites as $invite)
        {
            $sent_invites[] = $invite->json();
        }

        foreach($user->received_invites as $invite)
        {
            $received_invites[] = $invite->json();
        }

        return Inertia::render('Invite/Show', [
            "user" => ['id'=>$user->id, 'email'=>$user->email, 'name'=>$user->name],
            'sent'=>$sent_invites,
            'received'=>$received_invites,
            "status" => session("status"),
        ]);
    }
}
