<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Service;
use App\Support\Slugger;

class ServiceController
{
    public function index(Request $request): void
    {
        Response::json(Service::all(), 200);
    }

    public function show(Request $request, string $id): void
    {
        $service = Service::find((int) $id);

        if (!$service) {
            Response::json(['error' => 'Service introuvable'], 404);
            return;
        }

        Response::json($service, 200);
    }

    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['title'])) {
            Response::json(['error' => 'Titre requis'], 400);
            return;
        }

        $data['slug'] = !empty($data['slug']) ? $data['slug'] : Slugger::slugify($data['title']);

        $id = Service::create($data);
        Response::json(Service::find($id), 201);
    }

    public function update(Request $request, string $id): void
    {
        if (!Service::find((int) $id)) {
            Response::json(['error' => 'Service introuvable'], 404);
            return;
        }

        $data = $request->getBody();

        if (empty($data['title'])) {
            Response::json(['error' => 'Titre requis'], 400);
            return;
        }

        $data['slug'] = !empty($data['slug']) ? $data['slug'] : Slugger::slugify($data['title']);

        Service::update((int) $id, $data);
        Response::json(Service::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        Service::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
