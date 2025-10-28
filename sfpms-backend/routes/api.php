<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes with rate limiting
Route::prefix('auth')->middleware('rate.limit:5,1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Protected routes
Route::middleware('jwt.auth')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::get('statistics', [DashboardController::class, 'getStatistics']);
        Route::get('enrollment-trends', [DashboardController::class, 'getEnrollmentTrends']);
        Route::get('student-distribution', [DashboardController::class, 'getStudentDistribution']);
        Route::get('department-statistics', [DashboardController::class, 'getDepartmentStatistics']);
        Route::get('recent-activities', [DashboardController::class, 'getRecentActivities']);
    });

    // User management routes
    Route::prefix('users')->group(function () {
        // Routes accessible to all authenticated users
        Route::get('{id}', [UserController::class, 'show']);
        Route::put('{id}', [UserController::class, 'update']);
        
        // Admin-only routes
        Route::middleware('admin')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::post('/', [UserController::class, 'store']);
            Route::delete('{id}', [UserController::class, 'destroy']);
            Route::patch('{id}/toggle-status', [UserController::class, 'toggleStatus']);
            
            // Get users by role
            Route::get('role/{role}', [UserController::class, 'getUsersByRole']);
        });
    });

    // Department management routes
    Route::prefix('departments')->group(function () {
        // Routes accessible to all authenticated users (for department selection)
        Route::get('/', [DepartmentController::class, 'index']);
        Route::get('{id}', [DepartmentController::class, 'show']);
        
        // Admin-only routes
        Route::middleware('admin')->group(function () {
            Route::post('/', [DepartmentController::class, 'store']);
            Route::put('{id}', [DepartmentController::class, 'update']);
            Route::delete('{id}', [DepartmentController::class, 'destroy']);
        });
    });

    // Course management routes
    Route::prefix('courses')->group(function () {
        // Routes accessible to all authenticated users (for course selection)
        Route::get('/', [CourseController::class, 'index']);
        Route::get('department/{id}', [CourseController::class, 'getCoursesByDepartment']);
        Route::get('{id}', [CourseController::class, 'show']);
        
        // Admin-only routes
        Route::middleware('admin')->group(function () {
            Route::post('/', [CourseController::class, 'store']);
            Route::put('{id}', [CourseController::class, 'update']);
            Route::delete('{id}', [CourseController::class, 'destroy']);
        });
    });

    // Profile management routes
    Route::prefix('profiles')->group(function () {
        // Routes accessible to all authenticated users
        Route::get('user/{userId}', [ProfileController::class, 'getByUserId']);
        Route::get('statistics', [ProfileController::class, 'statistics']);
        
        // Student can manage their own profile
        Route::post('/', [ProfileController::class, 'store']);
        Route::put('{id}', [ProfileController::class, 'update']);
        Route::post('{id}/submit', [ProfileController::class, 'submit']);
        
        // Admin routes
        Route::middleware('admin')->group(function () {
            Route::get('/', [ProfileController::class, 'index']);
            Route::get('{id}', [ProfileController::class, 'show']);
            Route::post('{id}/approve', [ProfileController::class, 'approve']);
            Route::post('{id}/reject', [ProfileController::class, 'reject']);
            Route::delete('{id}', [ProfileController::class, 'destroy']);
        });
    });
});

// Health check endpoint
Route::get('health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'timestamp' => now()->toDateTimeString()
    ]);
});
