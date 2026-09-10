<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\App;
use App\Middlewares\CorsMiddleware;

//test: vérif ignored build step
// SÉCURITÉ: en prod (APP_ENV absent ou != 'development'), on masque toute erreur PHP
// au client (jamais de stack trace/chemin serveur dans une réponse) et on la journalise
// dans un fichier au lieu de stdout. En dev, on affiche les erreurs pour pouvoir déboguer.
// Chargé ici avant tout le reste pour couvrir aussi les erreurs de bootstrap.
$config = require __DIR__ . '/../src/Config/config.php';
if ($config['app']['env'] !== 'development') {
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    $logDir = __DIR__ . '/../storage/logs';
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    ini_set('error_log', $logDir . '/php-error.log');
} else {
    ini_set('display_errors', '1');
}
error_reporting(E_ALL);

CorsMiddleware::handle();

$app = new App();
$router = $app->getRouter();

require __DIR__ . '/../routes/api.php';

$app->run();
