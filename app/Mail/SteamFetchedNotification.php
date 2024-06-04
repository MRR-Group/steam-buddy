<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SteamFetchedNotification extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        private User $user,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Steam Buddy Ready to Roll!",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: "emails.steam-fetched",
            with: [
                "name" => $this->user->name,
            ],
        );
    }

    /**
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
