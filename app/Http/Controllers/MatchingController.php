<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Matching\MatchingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchingController extends Controller
{
    public function find(int $game_id, Request $request, MatchingService $matchingService)
    {
        $user = $request->user();

        $mates = $matchingService->find_mates($user, $game_id);

        for($i = 0; $i < count($mates); $i++)
        {
            $mate = User::query()->where(['id'=>$mates[$i]['id']])->first();
            $mates[$i] = [
                "id"=>$mate->id,
                "name"=>$mate->name,
                "description"=>$mate->description,
                "image"=>$mate->image,
            ];
        }

        return Inertia::render("Matching/Show", [
            "user" => ['id'=>$user->id, 'email'=>$user->email, 'name'=>$user->name],
            "mates" => $mates
        ]);
    }
}
