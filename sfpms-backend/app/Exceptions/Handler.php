<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        // Handle API requests with JSON responses
        if ($request->expectsJson() || $request->is('api/*')) {
            return $this->handleApiException($request, $exception);
        }

        return parent::render($request, $exception);
    }

    /**
     * Handle API exceptions and return JSON responses.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function handleApiException(Request $request, Throwable $exception): JsonResponse
    {
        // Validation exceptions
        if ($exception instanceof ValidationException) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $exception->errors(),
            ], 422);
        }

        // Authentication exceptions
        if ($exception instanceof AuthenticationException) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        // JWT Token exceptions
        if ($exception instanceof TokenExpiredException) {
            return response()->json([
                'success' => false,
                'message' => 'Token has expired',
            ], 401);
        }

        if ($exception instanceof TokenInvalidException) {
            return response()->json([
                'success' => false,
                'message' => 'Token is invalid',
            ], 401);
        }

        if ($exception instanceof JWTException) {
            return response()->json([
                'success' => false,
                'message' => 'Token error',
            ], 401);
        }

        // Authorization exceptions
        if ($exception instanceof AuthorizationException) {
            return response()->json([
                'success' => false,
                'message' => 'This action is unauthorized',
            ], 403);
        }

        // Model not found exceptions
        if ($exception instanceof ModelNotFoundException) {
            $model = class_basename($exception->getModel());
            return response()->json([
                'success' => false,
                'message' => "{$model} not found",
            ], 404);
        }

        // Route not found exceptions
        if ($exception instanceof NotFoundHttpException) {
            return response()->json([
                'success' => false,
                'message' => 'Endpoint not found',
            ], 404);
        }

        // Method not allowed exceptions
        if ($exception instanceof MethodNotAllowedHttpException) {
            return response()->json([
                'success' => false,
                'message' => 'Method not allowed',
                'allowed_methods' => $exception->getHeaders()['Allow'] ?? [],
            ], 405);
        }

        // Throttle exceptions (rate limiting)
        if ($exception instanceof ThrottleRequestsException) {
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please slow down.',
                'retry_after' => $exception->getHeaders()['Retry-After'] ?? 60,
            ], 429);
        }

        // Database connection exceptions
        if ($this->isDatabaseConnectionException($exception)) {
            return response()->json([
                'success' => false,
                'message' => 'Database connection error',
            ], 503);
        }

        // Generic server error
        if ($exception instanceof \Error || $exception instanceof \Exception) {
            $message = config('app.debug') 
                ? $exception->getMessage() 
                : 'Internal server error';

            $response = [
                'success' => false,
                'message' => $message,
            ];

            // Add debug information in debug mode
            if (config('app.debug')) {
                $response['debug'] = [
                    'exception' => get_class($exception),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => $exception->getTraceAsString(),
                ];
            }

            return response()->json($response, 500);
        }

        return parent::render($request, $exception);
    }

    /**
     * Check if the exception is a database connection error.
     *
     * @param  \Throwable  $exception
     * @return bool
     */
    protected function isDatabaseConnectionException(Throwable $exception): bool
    {
        $message = $exception->getMessage();
        
        return str_contains($message, 'SQLSTATE') ||
               str_contains($message, 'Connection refused') ||
               str_contains($message, 'Connection timed out') ||
               str_contains($message, 'MySQL server has gone away');
    }

    /**
     * Convert an authentication exception into a response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        return redirect()->guest($exception->redirectTo() ?? route('login'));
    }
}
