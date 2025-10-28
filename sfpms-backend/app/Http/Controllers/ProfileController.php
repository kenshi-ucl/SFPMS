<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Get all student profiles
     */
    public function index(Request $request)
    {
        try {
            $query = StudentProfile::with(['user', 'department', 'course']);

            // Filter by status
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            // Search by name
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('given_name', 'like', "%{$search}%")
                      ->orWhere('family_name', 'like', "%{$search}%")
                      ->orWhere('middle_name', 'like', "%{$search}%");
                });
            }

            $profiles = $query->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $profiles->items(),
                'meta' => [
                    'current_page' => $profiles->currentPage(),
                    'last_page' => $profiles->lastPage(),
                    'per_page' => $profiles->perPage(),
                    'total' => $profiles->total(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve profiles',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get a specific profile
     */
    public function show($id)
    {
        try {
            $profile = StudentProfile::with(['user', 'department', 'course'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Get profile by user ID
     */
    public function getByUserId($userId)
    {
        try {
            $profile = StudentProfile::where('user_id', $userId)->with(['user', 'department', 'course'])->first();

            if (!$profile) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No profile found for this user',
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new profile
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id|unique:student_profiles,user_id',
                'department_id' => 'nullable|exists:departments,id',
                'course_id' => 'nullable|exists:courses,id',
                'family_name' => 'required|string|max:255',
                'given_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'gender' => 'nullable|in:Male,Female',
                'date_of_birth' => 'nullable|date',
                'profile_picture' => 'nullable|image|max:2048',
            ]);

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                $path = $request->file('profile_picture')->store('profile_pictures', 'public');
                $validated['profile_picture'] = $path;
            }

            $profile = StudentProfile::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Profile created successfully',
                'data' => $profile->load(['user', 'department', 'course']),
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
                'message' => 'Failed to create profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update a profile
     */
    public function update(Request $request, $id)
    {
        try {
            $profile = StudentProfile::findOrFail($id);

            $validated = $request->validate([
                'department_id' => 'nullable|exists:departments,id',
                'course_id' => 'nullable|exists:courses,id',
                'family_name' => 'sometimes|required|string|max:255',
                'given_name' => 'sometimes|required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'gender' => 'nullable|in:Male,Female',
                'date_of_birth' => 'nullable|date',
                'profile_picture' => 'nullable|image|max:2048',
            ]);

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                // Delete old picture if exists
                if ($profile->profile_picture) {
                    Storage::disk('public')->delete($profile->profile_picture);
                }
                
                $path = $request->file('profile_picture')->store('profile_pictures', 'public');
                $validated['profile_picture'] = $path;
            }

            $profile->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $profile->load(['user', 'department', 'course']),
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Submit profile for review
     */
    public function submit($id)
    {
        try {
            $profile = StudentProfile::findOrFail($id);

            $profile->update([
                'status' => 'submitted',
                'submitted_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile submitted successfully',
                'data' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Approve profile
     */
    public function approve($id)
    {
        try {
            $profile = StudentProfile::findOrFail($id);

            $profile->update([
                'status' => 'approved',
                'approved_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile approved successfully',
                'data' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to approve profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Reject profile
     */
    public function reject($id)
    {
        try {
            $profile = StudentProfile::findOrFail($id);

            $profile->update([
                'status' => 'rejected',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile rejected',
                'data' => $profile,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a profile
     */
    public function destroy($id)
    {
        try {
            $profile = StudentProfile::findOrFail($id);

            // Delete profile picture if exists
            if ($profile->profile_picture) {
                Storage::disk('public')->delete($profile->profile_picture);
            }

            $profile->delete();

            return response()->json([
                'success' => true,
                'message' => 'Profile deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get profile statistics
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => StudentProfile::count(),
                'draft' => StudentProfile::draft()->count(),
                'submitted' => StudentProfile::submitted()->count(),
                'approved' => StudentProfile::approved()->count(),
                'rejected' => StudentProfile::where('status', 'rejected')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

