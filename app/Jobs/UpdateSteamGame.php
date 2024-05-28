<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Game;
use App\Models\User;
use App\Services\Steam\SteamService;
use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Log\Logger;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UpdateSteamGame implements ShouldQueue
{
    use Batchable;
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private int $playtime,
        private Game $game,
        private User $user,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(SteamService $steam): void
    {
        if ($this->batch()?->cancelled()) {
            return;
        }

        try {
            $steam->update_game($this->game, $this->user, $this->playtime);
        }
        catch(Exception $e)  {
            Log::error("Error " . $e->getMessage());
        }
    }
}
