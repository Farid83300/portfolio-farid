<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Tag;
use App\Support\Slugger;

class TagController
{
    public function index(Request $request): void
    {
        Response::json(Tag::all(), 200);
    }

    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['name'])) {
            Response::json(['error' => 'Nom requis'], 400);
            return;
        }

        $id = Tag::create([
            'name' => $data['name'],
            'slug' => $data['slug'] ?? Slugger::slugify($data['name']),
        ]);

        Response::json(Tag::find($id), 201);
    }

    public function destroy(Request $request, string $id): void
    {
        Tag::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
