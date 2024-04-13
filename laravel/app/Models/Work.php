<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;

    protected $fillable = [
        'work_id',
        'work_date',
        'work_task_id',
        'work_user_id',
        'work_state',//TODO 未完了 完了 不要
    ];

    protected $casts = [
        'work_id'=>'integer',
        'work_date',
        'work_task_id'=>'integer',
        'work_user_id'=>'integer',
        'work_state'=>'integer',
    ];
}
