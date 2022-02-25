<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'invitation_from_user_id',
        'invitation_to_user_id',
        'invitation_status',
    ];

    protected $casts = [
        'invitation_id'=>'integer',
        'invitation_from_user_id'=>'integer',
        'invitation_to_user_id'=>'integer',
        'invitation_status'=>'integer',
      ];
}
