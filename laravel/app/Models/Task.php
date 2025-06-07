<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'task_id',
        'task_user_id',
        'task_name',
        'task_sort_key',
    ];

    protected $casts = [
        'task_id' => 'integer',
        'task_user_id' => 'integer',
        'task_sort_key' => 'integer',
    ];

    public function works()
    {
        return $this->hasMany(Work::class, 'work_task_id', 'task_id');
    }
}
