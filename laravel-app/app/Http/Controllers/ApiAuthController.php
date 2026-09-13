<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\Auth\ClientLoginRequest as AuthClientLoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiAuthController extends Controller
{
    use ApiResponse;
    public function login(AuthClientLoginRequest $request)
{
    // 1. Get validated data
    $credentials = $request->validated();
    $user = User::where('email', $credentials['email'])->first();

    // 2. Handle authentication failure
    if (!$user) {
        return $this->error([
            'message' => 'Invalid login credentials.'
        ], 401); // Returns a 401 status code
    }

    if(!Hash::check($credentials['password'], $user->password)) {
        return $this->error([
            'message' => 'Invalid login credentials.'
        ], 401); // Returns a 401 status code
    }

    // 4. Return successful response with token
    return $this->success([
        'user' => $user,
        'token' => $user->createToken('auth_token')->plainTextToken
    ]);
}
    public function logout(Request $request){
        Auth::logout();
        $request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
