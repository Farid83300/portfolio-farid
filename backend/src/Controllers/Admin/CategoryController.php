<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Models\Category;
use App\Support\Slugger;

class CategoryController
{
    public function index(Request $request): void
    {
        Response::json(Category::all(), 200);
    }

    public function store(Request $request): void
    {
        $data = $request->getBody();

        if (empty($data['name'])) {
            Response::json(['error' => 'Nom requis'], 400);
            return;
        }

        $id = Category::create([
            'name' => $data['name'],
            'slug' => $data['slug'] ?? Slugger::slugify($data['name']),
            'description' => $data['description'] ?? null,
        ]);

        Response::json(Category::find($id), 201);
    }

    public function destroy(Request $request, string $id): void
    {
        Category::delete((int) $id);
        Response::json(['success' => true], 200);
    }
}
