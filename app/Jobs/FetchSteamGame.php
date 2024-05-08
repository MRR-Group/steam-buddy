<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\Steam\SteamService;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchSteamGame implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private int $game_id, 
        private int $playtime, 
        private User $user
    ){}

    /**
     * Execute the job.
     */
    public function handle(SteamService $steam): void
    {
        if ($this->batch()->cancelled()) { 
            return;
        }

        $steam->fetch_game($this->game_id, $this->playtime, $this->user);
    }
}
