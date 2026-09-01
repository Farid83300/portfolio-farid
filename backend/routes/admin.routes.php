<?php

use App\Controllers\Admin\DashboardController;
use App\Middlewares\AuthMiddleware;

/** @var \App\Core\Router $router */

$router->get('/admin/dashboard', function ($request) {
    AuthMiddleware::handle(); // bloque si pas de token valide
    (new DashboardController())->index($request);
});
