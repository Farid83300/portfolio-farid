<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\App;
use App\Middlewares\CorsMiddleware;

CorsMiddleware::handle();

$app = new App();
$router = $app->getRouter();

require __DIR__ . '/../routes/api.php';

$app->run();
