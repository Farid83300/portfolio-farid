<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Project;
use App\Services\UploadService;
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
        $project = Project::find((int) $id);

        if ($project) {
            $uploads = new UploadService();

            foreach ([$project['thumbnail'], $project['cover_image'], $project['preview_image']] as $path) {
                if (!empty($path)) {
                    $uploads->delete($path);
                }
            }

            foreach ($project['gallery'] ?? [] as $item) {
                if (!empty($item['image'])) {
                    $uploads->delete($item['image']);
                }
            }
        }

        Project::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
