<?php

use App\Controllers\Admin\ChatMessageController;
use App\Controllers\Admin\CommentController;
use App\Controllers\Admin\DashboardController;
use App\Controllers\Admin\MessageController;
use App\Controllers\Admin\NewsletterController;
use App\Controllers\Admin\PostController;
use App\Controllers\Admin\ProjectController;
use App\Controllers\Admin\SecurityController;
use App\Middlewares\AuthMiddleware;

/** @var \App\Core\Router $router */

$router->get('/admin/dashboard', function ($request) {
    AuthMiddleware::handle();
    (new DashboardController())->index($request);
});

// Sécurité / 2FA
$router->get('/admin/2fa/status', function ($request) {
    $payload = AuthMiddleware::handle('any');
    (new SecurityController())->status($request, $payload);
});
$router->post('/admin/2fa/setup', function ($request) {
    $payload = AuthMiddleware::handle('setup_2fa');
    (new SecurityController())->setup($request, $payload);
});
$router->post('/admin/2fa/enable', function ($request) {
    $payload = AuthMiddleware::handle('setup_2fa');
    (new SecurityController())->enable($request, $payload);
});
$router->post('/admin/2fa/disable', function ($request) {
    $payload = AuthMiddleware::handle();
    (new SecurityController())->disable($request, $payload);
});

// Articles
$router->get('/admin/posts', function ($request) {
    AuthMiddleware::handle();
    (new PostController())->index($request);
});
$router->get('/admin/posts/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new PostController())->show($request, $id);
});
$router->post('/admin/posts', function ($request) {
    AuthMiddleware::handle();
    (new PostController())->store($request);
});
$router->put('/admin/posts/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new PostController())->update($request, $id);
});
$router->delete('/admin/posts/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new PostController())->destroy($request, $id);
});

// Projets
$router->get('/admin/projects', function ($request) {
    AuthMiddleware::handle();
    (new ProjectController())->index($request);
});
$router->get('/admin/projects/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new ProjectController())->show($request, $id);
});
$router->post('/admin/projects', function ($request) {
    AuthMiddleware::handle();
    (new ProjectController())->store($request);
});
$router->put('/admin/projects/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new ProjectController())->update($request, $id);
});
$router->delete('/admin/projects/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new ProjectController())->destroy($request, $id);
});

// Commentaires blog
$router->get('/admin/comments', function ($request) {
    AuthMiddleware::handle();
    (new CommentController())->index($request);
});
$router->put('/admin/comments/{id}/status', function ($request, $id) {
    AuthMiddleware::handle();
    (new CommentController())->updateStatus($request, $id);
});
$router->delete('/admin/comments/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new CommentController())->destroy($request, $id);
});

// Messages contact
$router->get('/admin/messages', function ($request) {
    AuthMiddleware::handle();
    (new MessageController())->index($request);
});
$router->put('/admin/messages/{id}/read', function ($request, $id) {
    AuthMiddleware::handle();
    (new MessageController())->markRead($request, $id);
});
$router->delete('/admin/messages/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new MessageController())->destroy($request, $id);
});

// Messages chat
$router->get('/admin/chat-messages', function ($request) {
    AuthMiddleware::handle();
    (new ChatMessageController())->index($request);
});
$router->put('/admin/chat-messages/{id}/read', function ($request, $id) {
    AuthMiddleware::handle();
    (new ChatMessageController())->markRead($request, $id);
});
$router->delete('/admin/chat-messages/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new ChatMessageController())->destroy($request, $id);
});

// Newsletter
$router->get('/admin/newsletter', function ($request) {
    AuthMiddleware::handle();
    (new NewsletterController())->index($request);
});
$router->delete('/admin/newsletter/{id}', function ($request, $id) {
    AuthMiddleware::handle();
    (new NewsletterController())->destroy($request, $id);
});
