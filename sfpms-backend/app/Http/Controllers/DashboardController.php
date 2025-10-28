<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics()
    {
        try {
            // Get total counts
            $totalStudents = User::where('role', User::ROLE_STUDENT)->count();
            $totalFaculty = User::where('role', User::ROLE_FACULTY)->count();
            $totalDepartments = Department::where('status', 'active')->count();
            $totalCourses = Course::where('status', 'active')->count();

            // Calculate percentage changes (comparing to last month)
            $lastMonthStart = Carbon::now()->subMonth()->startOfMonth();
            $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();
            
            $studentsLastMonth = User::where('role', User::ROLE_STUDENT)
                ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
                ->count();
            
            $facultyLastMonth = User::where('role', User::ROLE_FACULTY)
                ->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])
                ->count();

            // Calculate percentage change
            $studentsChange = $totalStudents > 0 
                ? round(($studentsLastMonth / max($totalStudents - $studentsLastMonth, 1)) * 100, 1)
                : 0;
            
            $facultyChange = $totalFaculty > 0 
                ? round(($facultyLastMonth / max($totalFaculty - $facultyLastMonth, 1)) * 100, 1)
                : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'students' => [
                        'total' => $totalStudents,
                        'change' => $studentsChange,
                        'trend' => $studentsChange >= 0 ? 'up' : 'down',
                    ],
                    'faculty' => [
                        'total' => $totalFaculty,
                        'change' => $facultyChange,
                        'trend' => $facultyChange >= 0 ? 'up' : 'down',
                    ],
                    'departments' => [
                        'total' => $totalDepartments,
                        'active' => $totalDepartments,
                    ],
                    'courses' => [
                        'total' => $totalCourses,
                        'active' => $totalCourses,
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get enrollment trends for the last 6 months
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEnrollmentTrends()
    {
        try {
            $trends = [];
            
            // Get enrollment data for the last 6 months
            for ($i = 5; $i >= 0; $i--) {
                $month = Carbon::now()->subMonths($i);
                $monthStart = $month->copy()->startOfMonth();
                $monthEnd = $month->copy()->endOfMonth();
                
                $count = User::where('role', User::ROLE_STUDENT)
                    ->where('created_at', '<=', $monthEnd)
                    ->count();
                
                $trends[] = [
                    'month' => $month->format('M'),
                    'year' => $month->format('Y'),
                    'count' => $count,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $trends,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve enrollment trends',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get student distribution by department
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudentDistribution()
    {
        try {
            $distribution = Department::select('departments.id', 'departments.name', 'departments.code')
                ->withCount(['students' => function ($query) {
                    $query->where('role', User::ROLE_STUDENT);
                }])
                ->where('departments.status', 'active')
                ->having('students_count', '>', 0)
                ->orderBy('students_count', 'desc')
                ->limit(10)
                ->get();

            $total = $distribution->sum('students_count');

            $data = $distribution->map(function ($dept) use ($total) {
                return [
                    'name' => $dept->name,
                    'code' => $dept->code,
                    'count' => $dept->students_count,
                    'percentage' => $total > 0 ? round(($dept->students_count / $total) * 100, 1) : 0,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve student distribution',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get department statistics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDepartmentStatistics()
    {
        try {
            $stats = Department::select('departments.id', 'departments.name', 'departments.code')
                ->withCount([
                    'students' => function ($query) {
                        $query->where('role', User::ROLE_STUDENT);
                    },
                    'faculty' => function ($query) {
                        $query->where('role', User::ROLE_FACULTY);
                    },
                    'courses'
                ])
                ->where('departments.status', 'active')
                ->orderBy('students_count', 'desc')
                ->limit(5)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve department statistics',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get recent activities
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecentActivities()
    {
        try {
            $activities = [];

            // Get recent student registrations
            $recentStudents = User::where('role', User::ROLE_STUDENT)
                ->orderBy('created_at', 'desc')
                ->limit(3)
                ->get();

            foreach ($recentStudents as $student) {
                $activities[] = [
                    'type' => 'student_registration',
                    'title' => 'New student registration',
                    'description' => "{$student->name} registered for the system",
                    'timestamp' => $student->created_at,
                    'time_ago' => $student->created_at->diffForHumans(),
                ];
            }

            // Get recently updated faculty profiles
            $recentFaculty = User::where('role', User::ROLE_FACULTY)
                ->orderBy('updated_at', 'desc')
                ->limit(2)
                ->get();

            foreach ($recentFaculty as $faculty) {
                if ($faculty->updated_at->gt($faculty->created_at)) {
                    $activities[] = [
                        'type' => 'faculty_update',
                        'title' => 'Faculty profile updated',
                        'description' => "{$faculty->name} updated their profile",
                        'timestamp' => $faculty->updated_at,
                        'time_ago' => $faculty->updated_at->diffForHumans(),
                    ];
                }
            }

            // Get recently created courses
            $recentCourses = Course::orderBy('created_at', 'desc')
                ->limit(2)
                ->with('department')
                ->get();

            foreach ($recentCourses as $course) {
                $activities[] = [
                    'type' => 'course_created',
                    'title' => 'New course added',
                    'description' => "{$course->name} course created in {$course->department->name}",
                    'timestamp' => $course->created_at,
                    'time_ago' => $course->created_at->diffForHumans(),
                ];
            }

            // Sort by timestamp descending
            usort($activities, function ($a, $b) {
                return $b['timestamp'] <=> $a['timestamp'];
            });

            // Limit to 10 most recent
            $activities = array_slice($activities, 0, 10);

            return response()->json([
                'success' => true,
                'data' => $activities,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve recent activities',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all dashboard data in one call
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Get all data
            $statistics = $this->getStatistics()->getData()->data;
            $trends = $this->getEnrollmentTrends()->getData()->data;
            $distribution = $this->getStudentDistribution()->getData()->data;
            $departmentStats = $this->getDepartmentStatistics()->getData()->data;
            $activities = $this->getRecentActivities()->getData()->data;

            return response()->json([
                'success' => true,
                'data' => [
                    'statistics' => $statistics,
                    'enrollment_trends' => $trends,
                    'student_distribution' => $distribution,
                    'department_statistics' => $departmentStats,
                    'recent_activities' => $activities,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard data',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

