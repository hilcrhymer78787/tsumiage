<?php
// TODO: Log修正

use Illuminate\Support\Facades\Log;
use Throwable;

if (! function_exists('debugError')) {
    function debugError(Throwable $error): void
    {
        Log::error([
            'message' => $error->getMessage(),
            'file' => $error->getFile(),
            'line' => $error->getLine(),
            'trace' => $error->getTraceAsString(),
        ]);
    }
}
