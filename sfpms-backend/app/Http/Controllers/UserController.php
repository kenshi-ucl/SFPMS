<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;

class UserController extends Controller
{
    /**
     * Create a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin')->except(['show', 'update']);
    }

    /**
     * Display a listing of users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Filter by role if provided
        if ($request->has('role') && $request->role) {
            $query->byRole($request->role);
        }

        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Search by name or email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $users = $query->latest()->paginate($perPage);

        return new UserCollection($users);
    }

    /**
     * Store a newly created user.
     *
     * @param  \App\Http\Requests\RegisterRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(RegisterRequest $request)
    {

        // Validate role-specific fields
        if ($request->role === 'faculty' && !$request->employee_id) {
            return response()->json([
                'success' => false,
                'message' => 'Employee ID is required for faculty members'
            ], 400);
        }

        if ($request->role === 'student' && !$request->student_id) {
            return response()->json([
                'success' => false,
                'message' => 'Student ID is required for students'
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status ?? User::STATUS_ACTIVE,
            'employee_id' => $request->employee_id,
            'student_id' => $request->student_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'date_of_birth' => $request->date_of_birth,
            'department_id' => $request->department_id,
            'joined_at' => now(),
        ]);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(201)
            ->header('message', 'User created successfully');
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        
        // Admin can view any user, others can only view themselves
        if (!$currentUser->isAdmin() && $currentUser->id != $id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to view this user'
            ], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new UserResource($user),
            'message' => 'User retrieved successfully'
        ]);
    }

    /**
     * Update the specified user.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Admin can update any user, others can only update themselves
        // but users cannot change their own role or status
        if (!$currentUser->isAdmin() && $currentUser->id != $id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this user'
            ], 403);
        }

        $updateData = $request->only([
            'name', 'email', 'phone', 'address', 'date_of_birth', 'department_id'
        ]);

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        // Only admin can update these fields
        if ($currentUser->isAdmin()) {
            if ($request->has('role')) {
                $updateData['role'] = $request->role;
            }
            if ($request->has('status')) {
                $updateData['status'] = $request->status;
            }
            if ($request->has('employee_id')) {
                $updateData['employee_id'] = $request->employee_id;
            }
            if ($request->has('student_id')) {
                $updateData['student_id'] = $request->student_id;
            }
        }

        $user->update($updateData);

        return response()->json([
            'success' => true,
            'data' => new UserResource($user->fresh()),
            'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Prevent admin from deleting themselves
        if ($currentUser->id == $id) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get users by role (faculty or students)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersByRole(Request $request, $role)
    {
        if (!in_array($role, ['admin', 'faculty', 'student'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid role specified'
            ], 400);
        }

        $query = User::byRole($role)->active();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $users = $query->latest()->paginate($perPage);

        return (new UserCollection($users))
            ->additional(['message' => ucfirst($role) . ' users retrieved successfully']);
    }

    /**
     * Toggle user status (activate/deactivate)
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleStatus($id)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Prevent admin from deactivating themselves
        if ($currentUser->id == $id) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot change your own account status'
            ], 403);
        }

        $newStatus = $user->status === User::STATUS_ACTIVE 
            ? User::STATUS_INACTIVE 
            : User::STATUS_ACTIVE;

        $user->update(['status' => $newStatus]);

        return response()->json([
            'success' => true,
            'data' => new UserResource($user),
            'message' => 'User status updated successfully'
        ]);
    }
}
