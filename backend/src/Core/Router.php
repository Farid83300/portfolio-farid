<?php

namespace App\Core;

class Router
{
    private array $routes = [];

    public function get(string $uri, callable $handler): void
    {
        $this->routes['GET'][$uri] = $handler;
    }

    public function post(string $uri, callable $handler): void
    {
        $this->routes['POST'][$uri] = $handler;
    }

    public function put(string $uri, callable $handler): void
    {
        $this->routes['PUT'][$uri] = $handler;
    }

    public function delete(string $uri, callable $handler): void
    {
        $this->routes['DELETE'][$uri] = $handler;
    }

    public function dispatch(Request $request): void
    {
        $method = $request->getMethod();
        $uri = $request->getUri();

        if (isset($this->routes[$method][$uri])) {
            $handler = $this->routes[$method][$uri];
            $handler($request);
            return;
        }

        foreach ($this->routes[$method] ?? [] as $pattern => $handler) {
            if (!str_contains($pattern, '{')) {
                continue;
            }

            $regex = '#^' . preg_replace('/\{[^\/]+\}/', '([^/]+)', $pattern) . '$#';
            if (preg_match($regex, $uri, $matches)) {
                array_shift($matches);
                $handler($request, ...$matches);
                return;
            }
        }

        Response::json(['error' => 'Route non trouvée'], 404);
    }
}
