<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Department::query();

            // Apply filters
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%")
                      ->orWhere('head_of_department', 'like', "%{$search}%");
                });
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $departments = $query->withCount(['users', 'faculty', 'students'])
                                ->orderBy('created_at', 'desc')
                                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $departments->items(),
                'meta' => [
                    'current_page' => $departments->currentPage(),
                    'last_page' => $departments->lastPage(),
                    'per_page' => $departments->perPage(),
                    'total' => $departments->total(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch departments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:10|unique:departments,code',
                'description' => 'nullable|string',
                'head_of_department' => 'nullable|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'location' => 'nullable|string',
                'status' => 'required|in:active,inactive',
            ]);

            $department = Department::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Department created successfully',
                'data' => $department
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create department',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $department = Department::with(['users', 'faculty', 'students'])
                                   ->withCount(['users', 'faculty', 'students'])
                                   ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $department
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Department not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch department',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $department = Department::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'code' => ['required', 'string', 'max:10', Rule::unique('departments')->ignore($department)],
                'description' => 'nullable|string',
                'head_of_department' => 'nullable|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'location' => 'nullable|string',
                'status' => 'required|in:active,inactive',
            ]);

            $department->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Department updated successfully',
                'data' => $department
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Department not found'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update department',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $department = Department::findOrFail($id);

            // Check if department has users
            if ($department->users()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete department with associated users. Please reassign users first.'
                ], 422);
            }

            $department->delete();

            return response()->json([
                'success' => true,
                'message' => 'Department deleted successfully'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Department not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete department',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
