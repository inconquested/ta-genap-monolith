<?php

namespace App\Http\Controllers;

use App\Concerns\ApiResponse;
use App\Http\Requests\AchievementType\AchievementTypeStoreRequest;
use App\Http\Requests\AchievementType\AchievementTypeUpdateRequest;
use App\Models\AchievementType;
use App\Services\AchievementTypeService;

class AchievementTypeController extends Controller
{
    use ApiResponse;

    public function __construct(private AchievementTypeService $achievementTypeService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(request()->has('search')){
            return $this->success($this->achievementTypeService->search(request()->search));
        }
        return $this->success(AchievementType::with('media')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AchievementTypeStoreRequest $req)
    {
        $achievementType = $this->achievementTypeService->create(
            $req->validated(),
            $req->file('icon')
        );
        return $this->success(
            data: $achievementType,
            status: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(AchievementType $achievementType)
    {
        return $this->success($achievementType->load('media'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AchievementTypeUpdateRequest $req, AchievementType $achievementType)
    {
        $achievementType = $this->achievementTypeService->update(
            $achievementType,
            $req->validated(),
            $req->file('icon')
        );
        return $this->success(
            data: $achievementType,
            status: 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AchievementType $achievementType)
    {
        $this->achievementTypeService->delete($achievementType);
        return $this->success(
            data: null,
            status: 204,
        );
    }
}
