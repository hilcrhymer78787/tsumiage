<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

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
