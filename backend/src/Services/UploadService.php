<?php

namespace App\Services;

use App\Support\Slugger;
use RuntimeException;

class UploadService
{
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    private const MAX_SIZE_BYTES = 4 * 1024 * 1024;
    private const ALLOWED_DIRS = ['articles', 'projects', 'projects/gallery'];

    public function store(array $file, string $dir): string
    {
        if (!in_array($dir, self::ALLOWED_DIRS, true)) {
            throw new RuntimeException('Dossier de destination invalide');
        }

        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            throw new RuntimeException("Échec de l'upload");
        }

        if ($file['size'] > self::MAX_SIZE_BYTES) {
            throw new RuntimeException('Fichier trop volumineux (max 4 Mo)');
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
            throw new RuntimeException('Type de fichier non autorisé');
        }

        $basename = Slugger::slugify(pathinfo($file['name'], PATHINFO_FILENAME));
        $filename = $basename . '-' . uniqid() . '.' . $extension;

        $targetDir = __DIR__ . '/../../public/uploads/' . $dir;
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $targetPath = $targetDir . '/' . $filename;
        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            throw new RuntimeException("Impossible d'enregistrer le fichier");
        }

        return $dir . '/' . $filename;
    }
}
