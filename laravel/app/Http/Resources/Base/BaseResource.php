<?php

namespace App\Http\Resources\Base;

use App\Domains\Shared\Pagination\ValueObjects\PaginationMetadata;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @apiResource App\Http\Resources\Base\CastCardResource
 *
 * @apiResourceModel
 *
 * @SuppressWarnings(PHPMD.NumberOfChildren)
 */
abstract class BaseResource extends JsonResource
{
    /**
     * コンストラクタ
     *
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     *
     * @param  mixed  $resource
     */
    public function __construct($resource)
    {
        parent::__construct($resource);
    }

    /**
     * リソースを配列に変換
     *
     * @return array<string, mixed>
     *
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function toArray(Request $request): array
    {
        // コレクション or 単一エンティティ
        if ($this->resource instanceof \Illuminate\Support\Collection) {
            $data = $this->resource->map(fn ($item) => $this->transformItem($item));
        } else {
            $data = $this->transformItem($this->resource);
        }
        $array = [
            'data' => $data,
            'success' => true,
            'status' => 200,
        ];

        return $array;
    }

    /**
     * 単一のアイテムを配列に変換
     *
     * @param  mixed  $item
     * @return array<string, mixed>
     */
    abstract protected function transformItem($item): array;
}
