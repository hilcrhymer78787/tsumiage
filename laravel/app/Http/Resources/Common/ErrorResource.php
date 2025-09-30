<?php

declare(strict_types=1);

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;
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
        $resource = $this->resource;
        return [
            'status' => $this->getStatusCode(),
            'message' => $resource->getMessage(),
            'data' => method_exists($resource, 'getData') ? $resource->getData() : null,
            'detail' => $this->getFormatDetail(),
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
        return method_exists($this->resource, 'getStatusCode')
            ? $this->resource->getStatusCode()
            : 500;
    }

    /**
     * 詳細情報を整形（本番環境では非表示にする想定）
     */
    private function getFormatDetail(): ?array
    {
        if (!app()->environment('local')) return null;
        return [
            'file' => $this->resource->getFile(),
            'line' => $this->resource->getLine(),
            'trace' => $this->resource->getTraceAsString(),
        ];
    }
}
