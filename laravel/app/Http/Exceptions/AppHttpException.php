<?php

namespace App\Http\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class AppHttpException extends HttpException
{
    private array $data;

    /**
     * @param int $statusCode HTTPステータスコード
     * @param string $message エラーメッセージ
     * @param array $data 追加データ
     * @param Throwable|null $previous
     * @param array $headers
     * @param int $code
     */
    public function __construct(
        int $statusCode,
        string $message = '',
        array $data = null,
        Throwable $previous = null,
        array $headers = [],
        int $code = 0
    ) {
        parent::__construct($statusCode, $message, $previous, $headers, $code);
        $this->data = $data;
    }

    /**
     * 追加データを取得
     */
    public function getData(): array
    {
        return $this->data;
    }
}
