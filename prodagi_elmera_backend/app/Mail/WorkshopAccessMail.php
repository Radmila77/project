<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WorkshopAccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order,
        public string $channelUrl,
        public string $tariffLabel,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Доступ к закрытому каналу практикума',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.workshop-access',
        );
    }
}
