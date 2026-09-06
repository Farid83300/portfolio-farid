<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\NewsletterSubscriber;

class NewsletterController
{
    public function index(Request $request): void
    {
        Response::json(NewsletterSubscriber::all(), 200);
    }

    public function markViewed(Request $request): void
    {
        NewsletterSubscriber::markAllViewed();
        Response::json(['success' => true], 200);
    }

    public function destroy(Request $request, string $id): void
    {
        NewsletterSubscriber::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
