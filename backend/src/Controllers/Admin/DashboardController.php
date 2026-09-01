<?php

namespace App\Controllers\Admin;

use App\Core\Request;
use App\Core\Response;

class DashboardController
{
    public function index(Request $request): void
    {
        Response::json([
            'message' => 'Bienvenue sur le dashboard admin',
        ], 200);
    }
}
