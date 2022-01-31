<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'task_room_id',
        'task_name',
        'task_status',
        'task_default_minute',
        'task_is_everyday',
        'task_sort_key',
    ];

    protected $casts = [
        'task_id'=>'integer',
        'task_room_id'=>'integer',
        'task_status'=>'integer',
        'task_default_minute'=>'integer',
        'task_is_everyday'=>'integer',
        'task_sort_key'=>'integer',
      ];
}
