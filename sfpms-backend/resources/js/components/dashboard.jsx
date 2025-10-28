import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Building2, BookOpen, TrendingUp, Calendar, Award, Loader2, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const COLORS = ["#7C3AED", "#9333EA", "#A855F7", "#C084FC", "#E9D5FF", "#F3E8FF"]

export function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [statistics, setStatistics] = useState(null)
  const [enrollmentTrends, setEnrollmentTrends] = useState([])
  const [studentDistribution, setStudentDistribution] = useState([])
  const [departmentStats, setDepartmentStats] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  
  const { user: currentUser, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && currentUser) {
      fetchDashboardData()
    }
  }, [authLoading, currentUser])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all dashboard data in one call
      const response = await apiClient.getDashboardData()
      
      if (response.success) {
        const { data } = response
        
        setStatistics(data.statistics)
        setEnrollmentTrends(data.enrollment_trends || [])
        setStudentDistribution(data.student_distribution || [])
        setDepartmentStats(data.department_statistics || [])
        setRecentActivities(data.recent_activities || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error(error.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'student_registration':
        return { bg: 'bg-purple-50', dot: 'bg-purple-600' }
      case 'faculty_update':
        return { bg: 'bg-blue-50', dot: 'bg-blue-600' }
      case 'course_created':
        return { bg: 'bg-green-50', dot: 'bg-green-600' }
      default:
        return { bg: 'bg-gray-50', dot: 'bg-gray-600' }
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!statistics) {
    return (
      <Card className="m-6">
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to Load Dashboard</h3>
            <p className="text-gray-600 mb-4">Unable to fetch dashboard data</p>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Student & Faculty Profile Management System</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {statistics.students.total.toLocaleString()}
            </div>
            {statistics.students.change !== 0 && (
              <div className={`flex items-center text-sm ${statistics.students.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${statistics.students.trend === 'down' ? 'transform rotate-180' : ''}`} />
                {statistics.students.change > 0 ? '+' : ''}{statistics.students.change}% from last month
              </div>
            )}
            {statistics.students.change === 0 && (
              <div className="text-sm text-gray-500">No change from last month</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Faculty</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {statistics.faculty.total.toLocaleString()}
            </div>
            {statistics.faculty.change !== 0 && (
              <div className={`flex items-center text-sm ${statistics.faculty.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${statistics.faculty.trend === 'down' ? 'transform rotate-180' : ''}`} />
                {statistics.faculty.change > 0 ? '+' : ''}{statistics.faculty.change}% from last month
              </div>
            )}
            {statistics.faculty.change === 0 && (
              <div className="text-sm text-gray-500">No change from last month</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {statistics.departments.total}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {statistics.departments.active} active departments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {statistics.courses.total}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <Award className="w-4 h-4 mr-1" />
              {statistics.courses.active} active programs
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {enrollmentTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={2} name="Students" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No enrollment data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution by Department</CardTitle>
          </CardHeader>
          <CardContent>
            {studentDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {studentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} students (${props.payload.percentage}%)`, props.payload.name]} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No student distribution data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Department Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {departmentStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students_count" fill="#7C3AED" name="Students" />
                <Bar dataKey="faculty_count" fill="#9333EA" name="Faculty" />
                <Bar dataKey="courses_count" fill="#A855F7" name="Courses" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No department statistics available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const colors = getActivityColor(activity.type)
                return (
                  <div key={index} className={`flex items-center gap-4 p-3 ${colors.bg} rounded-lg`}>
                    <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time_ago}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-gray-500">
              No recent activities
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
