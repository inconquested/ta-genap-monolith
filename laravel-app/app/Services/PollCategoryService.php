<?php

namespace App\Services;

use App\Models\PollCategory;

class PollCategoryService
{
    public function getAll()
    {
        return PollCategory::all();
    }

    public function getById(PollCategory $pollCategory)
    {
        return $pollCategory;
    }

    public function create(array $data)
    {
        return PollCategory::create($data);
    }

    public function update(PollCategory $pollCategory, array $data)
    {
        $pollCategory->update($data);
        return $pollCategory;
    }

    public function delete(PollCategory $pollCategory)
    {
        return $pollCategory->delete();
    }
}
