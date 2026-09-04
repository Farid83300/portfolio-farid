<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;
use App\Services\UploadService;
use RuntimeException;

class UploadController
{
    public function store(Request $request): void
    {
        $dir = $_POST['dir'] ?? 'articles';

        if (empty($_FILES['file'])) {
            Response::json(['error' => 'Aucun fichier reçu'], 400);
            return;
        }

        try {
            $path = (new UploadService())->store($_FILES['file'], $dir);
        } catch (RuntimeException $e) {
            Response::json(['error' => $e->getMessage()], 400);
            return;
        }

        $config = require __DIR__ . '/../../Config/config.php';

        Response::json([
            'path' => $path,
            'url' => rtrim($config['app']['url'], '/') . '/uploads/' . $path,
        ], 201);
    }
}
