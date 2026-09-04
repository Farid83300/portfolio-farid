<?php

use App\Controllers\Admin\AuthController;
use App\Controllers\Public\ContactController;

/** @var \App\Core\Router $router */

$router->post('/admin/login', function ($request) {
    (new AuthController())->login($request);
});

$router->post('/contact', function ($request) {
    (new ContactController())->store($request);
});
