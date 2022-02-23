<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'goal_id',
        'goal_minute',
        'goal_task_id',
        'goal_user_id',
        'goal_start_date',
        'goal_end_date',
    ];

    protected $casts = [
        'goal_id' => 'integer',
        'goal_minute' => 'integer',
        'goal_task_id' => 'integer',
        'goal_user_id' => 'integer',
    ];
}
