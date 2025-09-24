<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

// TODO: もっと綺麗に書けそう
// TODO: 情報漏洩対策
class ErrorResource extends JsonResource
{
    public function __construct(Throwable $resource)
    {
        $this->resource = $resource;
    }

    /**
     * 配列化（レスポンスボディ）
     */
    public function toArray($request): array
    {
        return [
            'status' => $this->getStatusCode(),
            'message' => $this->resource->getMessage(),
            'detail'  => [
                'file'  => $this->resource->getFile(),
                'line'  => $this->resource->getLine(),
                'trace' => $this->resource->getTraceAsString(),
            ],
        ];
    }

    /**
     * レスポンス作成時にステータスコードをセット
     */
    public function withResponse($request, $response): void
    {
        $response->setStatusCode($this->getStatusCode());
    }

    /**
     * 例外からステータスコードを取得
     */
    private function getStatusCode(): int
    {
        return $this->resource instanceof HttpExceptionInterface
            ? $this->resource->getStatusCode()
            : 500;
    }
}
