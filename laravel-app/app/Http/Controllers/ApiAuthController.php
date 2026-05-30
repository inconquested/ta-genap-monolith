<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Concerns\ApiResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\ClientLoginRequest;

class ApiAuthController extends Controller
{
    use ApiResponse;
    public function login(ClientLoginRequest $req)
    {
        if (!Auth::attempt($req->validated())) {
            return $this->error(errors: [
                'email' => 'Invalid credentials',
                'password' => 'Invalid credentials',
            ], message: 'Invalid credentials', status: 401);
        }
        $user = $req->user();
        $token = $user->createToken('api')->plainTextToken;
        return $this->success(data: [
            'token' => $token,
            'user' => $user,
        ]);
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }
        $user->currentAccessToken()->delete();
        return $this->success(data: [], status: 204);
    }

}
