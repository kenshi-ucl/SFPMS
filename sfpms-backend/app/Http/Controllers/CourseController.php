<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $query = Course::with('department');

            // Filter by department if provided
            if (request()->has('department_id') && request()->department_id != null) {
                $query->where('department_id', request()->department_id);
            }

            $courses = $query->get();

            return response()->json([
                'success' => true,
                'message' => 'Courses retrieved successfully',
                'data' => $courses,
                'count' => $courses->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve courses',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created course in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'nullable|string|max:50|unique:courses',
                'department_id' => 'required|exists:departments,id',
                'description' => 'nullable|string',
                'status' => 'required|in:active,inactive',
            ]);

            $course = Course::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Course created successfully',
                'data' => $course->load('department'),
            ], Response::HTTP_CREATED);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create course',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified course.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $course = Course::with('department')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Course retrieved successfully',
                'data' => $course,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found',
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve course',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified course in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $course = Course::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'code' => 'sometimes|nullable|string|max:50|unique:courses,code,' . $id,
                'department_id' => 'sometimes|required|exists:departments,id',
                'description' => 'sometimes|nullable|string',
                'status' => 'sometimes|required|in:active,inactive',
            ]);

            $course->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Course updated successfully',
                'data' => $course->load('department'),
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found',
            ], Response::HTTP_NOT_FOUND);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update course',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified course from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->delete();

            return response()->json([
                'success' => true,
                'message' => 'Course deleted successfully',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found',
            ], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete course',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get courses by department.
     *
     * @param  int  $departmentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCoursesByDepartment($departmentId)
    {
        try {
            $courses = Course::byDepartment($departmentId)->get();

            return response()->json([
                'success' => true,
                'message' => 'Courses retrieved successfully',
                'data' => $courses,
                'count' => $courses->count(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve courses',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
