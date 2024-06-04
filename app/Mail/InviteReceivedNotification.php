<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Invite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InviteReceivedNotification extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        private Invite $invite,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You have a new invite!",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: "emails.invite-received",
            with: [
                "sender_name" => $this->invite->sender->name,
                "receiver_name" => $this->invite->receiver->name,
                "game" => $this->invite->game->name,
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
