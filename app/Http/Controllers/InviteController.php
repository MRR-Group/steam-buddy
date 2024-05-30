<?php

namespace App\Http\Controllers;

use App\Exceptions\GameNotFoundException;
use App\Exceptions\InvalidInviteDataException;
use App\Exceptions\InviteNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Http\Requests\InviteUpdateRequest;
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
        $game = GameDetail::query()->where(['steam_id'=>$game_id])->first();

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
        $accepted_invites = [];

        foreach($user->sent_invites as $invite)
        {
            $json = $invite->json();

            if($invite->is_accepted)
            {
                $json['steam_id'] = $invite->receiver->steam_id;
                $accepted_invites[] = $json;
            }
            else
            {
                $sent_invites[] = $json;
            }
        }

        foreach($user->received_invites as $invite)
        {
            $json = $invite->json();

            if($invite->is_accepted)
            {
                $json['steam_id'] = $invite->sender->steam_id;
                $accepted_invites[] = $json;
            }
            else if(!$invite->is_rejected)
            {
                $sent_invites[] = $json;
            }
        }

        return Inertia::render('Invite/Show', [
            "user" => ['id'=>$user->id, 'email'=>$user->email, 'name'=>$user->name],
            'sent'=>$sent_invites,
            'received'=>$received_invites,
            'accepted'=>$accepted_invites,
            "status" => session("status"),
        ]);
    }

    public function update(InviteUpdateRequest $request, int $id)
    {
        $invite = Invite::query()->where(['id' => $id])->first();

        if(is_null($invite))
        {
            throw new InviteNotFoundException();
        }

        $data = $request->validated();

        if($request->validated('is_accepted') && $request->validated('is_rejected'))
        {
            throw new InvalidInviteDataException();
        }

        $invite->fill($data);
        $invite->save();

        $status = $invite->is_accepted ? 'accepted' : 'rejected';

        return Redirect::route("invite.show")->with("status", $status . " invite from " . $invite->sender->name);
    }

    public function remove(InviteUpdateRequest $request, int $id)
    {
        $invite = Invite::query()->where(['id' => $id])->first();

        if(is_null($invite))
        {
            throw new InviteNotFoundException();
        }

        $invite->delete();

        return Redirect::route("invite.show")->with("status","Deleted invite from " . $invite->sender->name);
    }
}