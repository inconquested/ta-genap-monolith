<?php

namespace App\Http\Controllers;

use App\Models\PollCategory;
use App\Concerns\ApiResponse;
use App\Services\PollCategoryService;
use App\Http\Requests\PollCategory\PollCategoryUpdateRequest;
use App\Http\Requests\PollCategory\PollCategoryStoreRequest;

class PollCategoryController extends Controller
{
    use ApiResponse;

    public function __construct(private PollCategoryService $pollCategoryService) {}

    /**
     * Display a listing of the resource.
     */
  public function index()
    {
        return $this->success($this->pollCategoryService->getAll());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PollCategoryStoreRequest $request)
    {
        $pollCategory = $this->pollCategoryService->create($request->validated());
        return $this->success(data: $pollCategory, status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PollCategory $pollCategory)
    {
        return $this->success($this->pollCategoryService->getById($pollCategory));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PollCategoryUpdateRequest $request, PollCategory $pollCategory)
    {
        $pollCategory = $this->pollCategoryService->update($pollCategory, $request->validated());
        return $this->success(data: $pollCategory, status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PollCategory $pollCategory)
    {
        $this->pollCategoryService->delete($pollCategory);
        return $this->success(data: null, status: 204);
    }
}
