<?php
// TODO: ErrorResource を使いたい

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Auth\AuthenticationException;

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
      if(!$loginInfo)throw new AuthenticationException('トークンが有効期限切れです');
      return $next($request);
    }
}
