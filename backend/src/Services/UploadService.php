<?php

namespace App\Services;

use App\Support\Slugger;
use RuntimeException;

class UploadService
{
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    private const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];
    private const MAX_SIZE_BYTES = 4 * 1024 * 1024;
    // L'image de preview (modale "site pas encore en ligne") tolère des captures
    // d'écran plus lourdes (pleine page, haute résolution) que les autres visuels.
    private const DIR_MAX_SIZE_BYTES = [
        'projects/preview' => 10 * 1024 * 1024,
    ];
    private const ALLOWED_DIRS = ['articles', 'projects', 'projects/gallery', 'projects/preview', 'services'];

    public function store(array $file, string $dir): string
    {
        if (!in_array($dir, self::ALLOWED_DIRS, true)) {
            throw new RuntimeException('Dossier de destination invalide');
        }

        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            throw new RuntimeException("Échec de l'upload");
        }

        $maxSize = self::DIR_MAX_SIZE_BYTES[$dir] ?? self::MAX_SIZE_BYTES;
        if ($file['size'] > $maxSize) {
            $maxMo = (int) ($maxSize / (1024 * 1024));
            throw new RuntimeException("Fichier trop volumineux (max {$maxMo} Mo)");
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
            throw new RuntimeException('Type de fichier non autorisé');
        }

        // SÉCURITÉ: vérifie le contenu réel du fichier (pas seulement son extension
        // déclarée), pour empêcher l'upload d'un fichier renommé (ex: script déguisé en .jpg).
        $mimeType = mime_content_type($file['tmp_name']);
        if ($mimeType === false || !in_array($mimeType, self::ALLOWED_MIME_TYPES, true)) {
            throw new RuntimeException('Le contenu du fichier ne correspond pas à une image valide');
        }

        if (@getimagesize($file['tmp_name']) === false) {
            throw new RuntimeException('Le contenu du fichier ne correspond pas à une image valide');
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

    public function delete(string $path): void
    {
        $path = ltrim($path, '/');
        // SÉCURITÉ: rejette toute tentative de path traversal (`..`) avant même de
        // regarder le dossier parent — défense en profondeur avec le realpath() plus bas.
        if ($path === '' || str_contains($path, '..')) {
            throw new RuntimeException('Chemin de fichier invalide');
        }

        // SÉCURITÉ: le dossier parent du chemin doit être un des dossiers d'upload autorisés,
        // sinon un client pourrait tenter de faire supprimer n'importe quel fichier du serveur.
        if (!in_array(dirname($path), self::ALLOWED_DIRS, true)) {
            throw new RuntimeException('Chemin de fichier invalide');
        }

        $base = realpath(__DIR__ . '/../../public/uploads');
        $real = realpath($base . '/' . $path);

        // SÉCURITÉ: double vérification via realpath() — le chemin résolu doit rester
        // physiquement à l'intérieur de public/uploads/ (protège même contre un symlink
        // ou un cas non couvert par les contrôles précédents). Fichier déjà absent (ou
        // hors du dossier uploads malgré la validation ci-dessus) : on considère
        // l'opération réussie plutôt que de faire échouer la suppression du champ.
        if ($real === false || !str_starts_with($real, $base . DIRECTORY_SEPARATOR)) {
            return;
        }

        @unlink($real);
    }
}
