<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\AchievementTypeStoreRequest;
use App\Http\Requests\AchievementTypeUpdateRequest;
use App\Models\AchievementType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementTypeController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->success(AchievementType::get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AchievementTypeStoreRequest $req)
    {
        return $this->success(
            data: AchievementType::create($req->validated()),
            status: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(AchievementType $achievementType)
    {
        return $this->success($achievementType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AchievementType $achievementType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AchievementTypeUpdateRequest $req, AchievementType $achievementType)
    {
        return $this->success(
            data: $achievementType->update($req->validated()),
            status: 201
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AchievementType $achievementType)
    {
        //
    }
}
