<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Gate provider/admin-only endpoints. Runs after auth:sanctum, so user() is set.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role !== UserRole::ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden',
                'errors' => 'Admin access required',
                'status' => 403,
            ], 403);
        }

        return $next($request);
    }
}
