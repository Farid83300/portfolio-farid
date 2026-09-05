<?php

use App\Controllers\Admin\AuthController;
use App\Controllers\Public\ContactController;
use App\Controllers\Public\NewsletterController;
use App\Controllers\Public\PostController;
use App\Controllers\Public\ProjectController;
use App\Controllers\Public\ServiceController;

/** @var \App\Core\Router $router */

$router->post('/admin/login', function ($request) {
    (new AuthController())->login($request);
});

$router->post('/contact', function ($request) {
    (new ContactController())->store($request);
});

$router->post('/newsletter', function ($request) {
    (new NewsletterController())->store($request);
});

$router->get('/posts', function ($request) {
    (new PostController())->index($request);
});
$router->get('/posts/{slug}', function ($request, $slug) {
    (new PostController())->show($request, $slug);
});

$router->get('/projects', function ($request) {
    (new ProjectController())->index($request);
});
$router->get('/projects/{slug}', function ($request, $slug) {
    (new ProjectController())->show($request, $slug);
});

$router->get('/services', function ($request) {
    (new ServiceController())->index($request);
});
$router->get('/services/{slug}', function ($request, $slug) {
    (new ServiceController())->show($request, $slug);
});
