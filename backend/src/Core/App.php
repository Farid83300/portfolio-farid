<?php

namespace App\Core;

class App
{
    private Router $router;

    public function __construct()
    {
        $this->router = new Router();
    }

    public function getRouter(): Router
    {
        return $this->router;
    }

    public function run(): void
    {
        $request = new Request();
        $this->router->dispatch($request);
    }
}
