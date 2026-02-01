<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PollCategory extends Model
{
    /** @use HasFactory<\Database\Factories\PollCategoryFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'label'
    ];
    public function polls():HasMany{
        return $this->hasMany(PollCategory::class, 'category');
    }
}
