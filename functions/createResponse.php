<?php
function createResponse(bool $status, string $message, int $statusCode): array
{
    $response = [
        'status' => $status,
        'message' => $message
    ];

    http_response_code($statusCode);

    return $response;
}

