<?php

namespace App\Controllers\Public;

use App\Core\Request;
use App\Core\Response;
use App\Models\Project;

class ProjectController
{
    public function index(Request $request): void
    {
        Response::json(Project::all(), 200);
    }

    public function show(Request $request, string $slug): void
    {
        $project = Project::findBySlug($slug);

        if (!$project) {
            Response::json(['error' => 'Projet introuvable'], 404);
            return;
        }

        Project::incrementViews((int) $project['id']);
        $project['views_count']++;

        Response::json($project, 200);
    }
}
