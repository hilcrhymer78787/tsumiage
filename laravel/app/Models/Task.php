<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'task_user_id',
        'task_name',
        'task_status',
        'task_default_minute',
        'task_sort_key',
    ];

    protected $casts = [
        'task_id'=>'integer',
        'task_user_id'=>'integer',
        'task_status'=>'integer',
        'task_default_minute'=>'integer',
        'task_sort_key'=>'integer',
      ];
}
