<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Service;
use App\Services\RateLimiter;

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

        Response::json($service, 200);
    }

    // SÉCURITÉ: séparé de show() car cette route GET est mise en cache
    // (ISR, next: { revalidate: 3600 }) côté frontend — incrémenter ici
    // ne comptait plus qu'une vue par heure et par service. Appelé côté
    // client (non caché) à chaque affichage réel de la page.
    public function trackView(Request $request, string $slug): void
    {
        $service = Service::findBySlug($slug);

        if (!$service || $service['status'] !== 'published') {
            Response::json(['error' => 'Service introuvable'], 404);
            return;
        }

        $rateLimiter = new RateLimiter();
        $key = 'view:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        if (!$rateLimiter->tooManyAttempts($key)) {
            $rateLimiter->hit($key, 60, 600);
            Service::incrementViews((int) $service['id']);
        }

        Response::json(['success' => true], 200);
    }
}
