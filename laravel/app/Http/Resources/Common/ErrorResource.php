<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;
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
        $resource = $this->resource;
        return [
            'status' => $this->getStatusCode(),
            'message' => $resource->getMessage(),
            'data' => method_exists($resource, 'getData') ? $resource->getData() : null,
            'detail'  => [
                'file'  => $resource->getFile(),
                'line'  => $resource->getLine(),
                'trace' => $resource->getTraceAsString(),
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
        $resource = $this->resource;
        return method_exists($resource, 'getStatusCode') ? $resource->getStatusCode() : 500;
    }
}
