<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Project;
use App\Support\Slugger;

class ProjectController
{
    public function index(Request $request): void
    {
        Response::json(Project::all(), 200);
    }

    public function show(Request $request, string $id): void
    {
        $project = Project::find((int) $id);

        if (!$project) {
            Response::json(['error' => 'Projet introuvable'], 404);
            return;
        }

        Response::json($project, 200);
    }

    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['title'])) {
            Response::json(['error' => 'Titre requis'], 400);
            return;
        }

        $data['slug'] = !empty($data['slug']) ? $data['slug'] : Slugger::slugify($data['title']);

        $id = Project::create($data);
        Response::json(Project::find($id), 201);
    }

    public function update(Request $request, string $id): void
    {
        if (!Project::find((int) $id)) {
            Response::json(['error' => 'Projet introuvable'], 404);
            return;
        }

        $data = $request->getBody();

        if (empty($data['title'])) {
            Response::json(['error' => 'Titre requis'], 400);
            return;
        }

        $data['slug'] = !empty($data['slug']) ? $data['slug'] : Slugger::slugify($data['title']);

        Project::update((int) $id, $data);
        Response::json(Project::find((int) $id), 200);
    }

    public function destroy(Request $request, string $id): void
    {
        Project::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
