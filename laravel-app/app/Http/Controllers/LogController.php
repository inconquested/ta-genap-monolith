<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Services\LogTailService;
use Illuminate\Http\Request;

class LogController extends Controller
{
    use ApiResponse;

    /**
     * GET /api/logs/tail — cursor-based application log tail (admin only).
     * Throttled (strict-api: 60/min/user); desktop polls every few seconds.
     */
    public function tail(Request $request)
    {
        return $this->success(LogTailService::tail($request));
    }
}
