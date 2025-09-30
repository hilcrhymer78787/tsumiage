<?php

use Illuminate\Support\Facades\Log;

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
