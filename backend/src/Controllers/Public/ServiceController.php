<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Service;

class ServiceController
{
    public function index(Request $request): void
    {
        Response::json(Service::published(), 200);
    }

    public function show(Request $request, string $slug): void
    {
        $service = Service::findBySlug($slug);

        if (!$service || $service['status'] !== 'published') {
            Response::json(['error' => 'Service introuvable'], 404);
            return;
        }

        Service::incrementViews((int) $service['id']);
        $service['views_count']++;

        Response::json($service, 200);
    }
}
