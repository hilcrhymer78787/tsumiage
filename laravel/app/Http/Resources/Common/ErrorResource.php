<?php

namespace App\Http\Resources\Common;

use Illuminate\Http\Resources\Json\JsonResource;
use RuntimeException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class ErrorResource extends JsonResource
{
    public function __construct(Throwable $resource)
    {
        $this->resource = $resource;
    }

    public function toArray($request): array
    {
        $status = $this->resource instanceof HttpExceptionInterface
            ? $this->resource->getStatusCode()
            : 500;

        return [
            'status' => $status,
            'errorMessage' => $this->resource->getMessage(),
        ];
    }
}
