<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\UserService;

class CheckToken
{
    /**
     * 送信されてきたリクエストの処理
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
      $loginInfo = (new UserService())->getLoginInfoByRequest($request);
      if(!$loginInfo){
          return response()->json(['errorMessage' => 'トークンが有効期限切れです'], 401);
      }
      return $next($request);
    }
}
