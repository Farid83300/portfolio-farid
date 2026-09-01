<?php

use App\Controllers\Admin\AuthController;

/** @var \App\Core\Router $router */

$router->post('/admin/login', function ($request) {
    (new AuthController())->login($request);
});
