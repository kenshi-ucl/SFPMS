"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Award, Target, BookOpen, User, Calendar, Trophy, AlertTriangle, CheckCircle, Download } from "lucide-react"

interface SemesterGrade {
  semester: string
  semesterNumber: number
  gpa: number
  cgpa: number
  totalCredits: number
  status: "Completed" | "Current" | "Upcoming"
  subjects: {
    code: string
    name: string
    credits: number
    grade: string
    gradePoints: number
  }[]
}

interface AcademicGoal {
  id: string
  title: string
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  status: "On Track" | "Behind" | "Achieved" | "At Risk"
  category: "GPA" | "Attendance" | "Credits" | "Skills"
}

interface ProgressMetric {
  metric: string
  current: number
  target: number
  percentage: number
  trend: "up" | "down" | "stable"
  status: "Good" | "Average" | "Poor"
}

const mockSemesterGrades: SemesterGrade[] = [
  {
    semester: "First Semester 2024-2025",
    semesterNumber: 1,
    gpa: 3.75,
    cgpa: 3.75,
    totalCredits: 23,
    status: "Current",
    subjects: [
      { code: "BRIDG 001", name: "Bridging Subject 1", credits: 3, grade: "A", gradePoints: 12.0 },
      { code: "GE 104", name: "Mathematics in the Modern World", credits: 3, grade: "A-", gradePoints: 11.1 },
      { code: "IT 170", name: "Computer Fundamentals", credits: 3, grade: "B+", gradePoints: 9.9 },
      { code: "IT 171", name: "Programming Fundamentals", credits: 3, grade: "B", gradePoints: 9.0 },
      { code: "GE 105", name: "Purposive Communication", credits: 3, grade: "A", gradePoints: 12.0 },
      { code: "NSTP 1", name: "National Service Training Program 1", credits: 3, grade: "A", gradePoints: 12.0 },
      { code: "PE 1", name: "Physical Education 1", credits: 2, grade: "A", gradePoints: 8.0 },
      { code: "MATH 171", name: "Discrete Math", credits: 3, grade: "B-", gradePoints: 8.1 },
    ]
  },
  {
    semester: "Second Semester 2024-2025",
    semesterNumber: 2,
    gpa: 0,
    cgpa: 3.75,
    totalCredits: 24,
    status: "Upcoming",
    subjects: [
      { code: "GE 106", name: "Art Appreciation", credits: 3, grade: "-", gradePoints: 0 },
      { code: "IT 172", name: "Object-Oriented Programming", credits: 3, grade: "-", gradePoints: 0 },
      { code: "IT 173", name: "Data Structures and Algorithms", credits: 3, grade: "-", gradePoints: 0 },
      { code: "MATH 172", name: "Statistics and Probability", credits: 3, grade: "-", gradePoints: 0 },
      { code: "NSTP 2", name: "National Service Training Program 2", credits: 3, grade: "-", gradePoints: 0 },
      { code: "PE 2", name: "Physical Education 2", credits: 2, grade: "-", gradePoints: 0 },
      { code: "GE 107", name: "Science, Technology and Society", credits: 3, grade: "-", gradePoints: 0 },
      { code: "IT 174", name: "Web Development Fundamentals", credits: 4, grade: "-", gradePoints: 0 },
    ]
  }
]

const mockAcademicGoals: AcademicGoal[] = [
  {
    id: "1",
    title: "Maintain GPA above 3.5",
    targetValue: 3.5,
    currentValue: 3.75,
    unit: "GPA",
    deadline: "2025-05-30",
    status: "Achieved",
    category: "GPA"
  },
  {
    id: "2",
    title: "Achieve 90% Attendance",
    targetValue: 90,
    currentValue: 87,
    unit: "%",
    deadline: "2025-05-30",
    status: "Behind",
    category: "Attendance"
  },
  {
    id: "3",
    title: "Complete 47 Credits",
    targetValue: 47,
    currentValue: 23,
    unit: "Credits",
    deadline: "2025-05-30",
    status: "On Track",
    category: "Credits"
  },
  {
    id: "4",
    title: "Learn 3 Programming Languages",
    targetValue: 3,
    currentValue: 1,
    unit: "Languages",
    deadline: "2025-05-30",
    status: "Behind",
    category: "Skills"
  }
]

const mockProgressMetrics: ProgressMetric[] = [
  { metric: "Overall GPA", current: 3.75, target: 3.5, percentage: 107, trend: "up", status: "Good" },
  { metric: "Credits Completed", current: 23, target: 47, percentage: 49, trend: "up", status: "Average" },
  { metric: "Average Attendance", current: 87, target: 90, percentage: 97, trend: "down", status: "Average" },
  { metric: "Subjects Passed", current: 8, target: 8, percentage: 100, trend: "stable", status: "Good" },
]

const gradeDistributionData = [
  { grade: "A", count: 4, percentage: 50 },
  { grade: "A-", count: 1, percentage: 12.5 },
  { grade: "B+", count: 1, percentage: 12.5 },
  { grade: "B", count: 1, percentage: 12.5 },
  { grade: "B-", count: 1, percentage: 12.5 },
]

const gpaProgressData = [
  { semester: "Sem 1", gpa: 3.75, cgpa: 3.75 },
  { semester: "Sem 2", gpa: 0, cgpa: 3.75 },
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00']

export function StudentAcademicProgress() {
  const [semesterGrades] = useState<SemesterGrade[]>(mockSemesterGrades)
  const [academicGoals] = useState<AcademicGoal[]>(mockAcademicGoals)
  const [progressMetrics] = useState<ProgressMetric[]>(mockProgressMetrics)
  const [selectedSemester, setSelectedSemester] = useState<string>("All")

  const currentSemester = semesterGrades.find(s => s.status === "Current")
  const completedSemesters = semesterGrades.filter(s => s.status === "Completed")
  const overallCGPA = currentSemester?.cgpa || 0
  const totalCreditsCompleted = semesterGrades
    .filter(s => s.status === "Completed" || s.status === "Current")
    .reduce((sum, s) => sum + s.totalCredits, 0)

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "Achieved":
        return "bg-green-100 text-green-800"
      case "On Track":
        return "bg-blue-100 text-blue-800"
      case "Behind":
        return "bg-yellow-100 text-yellow-800"
      case "At Risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "text-green-600"
      case "Average":
        return "text-yellow-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  const getGradePoints = (grade: string) => {
    const gradeMap: Record<string, number> = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
    return gradeMap[grade] || 0
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Progress</h1>
          <p className="text-gray-600">Track your academic performance and progress towards your goals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Progress Report
          </Button>
        </div>
      </div>

      {/* Student Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">JOHN DOE</p>
                <p className="text-sm text-gray-600">BSIT-2024-001</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current CGPA</p>
              <p className="text-2xl font-bold text-purple-600">{overallCGPA.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-blue-600">{totalCreditsCompleted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Academic Standing</p>
              <Badge className="bg-green-100 text-green-800">Good Standing</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {progressMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${getMetricStatusColor(metric.status)}`}>
                    {metric.current}
                  </span>
                  <span className="text-sm text-gray-500">/ {metric.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.status === "Good" ? "bg-green-500" :
                      metric.status === "Average" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{metric.percentage}% of target</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grades">Grade Analysis</TabsTrigger>
          <TabsTrigger value="goals">Academic Goals</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  GPA Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={gpaProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[0, 4]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="gpa" stroke="#8884d8" strokeWidth={2} name="Semester GPA" />
                    <Line type="monotone" dataKey="cgpa" stroke="#82ca9d" strokeWidth={2} name="Cumulative GPA" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Current Semester Breakdown */}
          {currentSemester && (
            <Card>
              <CardHeader>
                <CardTitle>Current Semester - {currentSemester.semester}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Semester GPA</p>
                    <p className="text-2xl font-bold text-purple-600">{currentSemester.gpa.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Credits</p>
                    <p className="text-2xl font-bold text-blue-600">{currentSemester.totalCredits}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Subjects</p>
                    <p className="text-2xl font-bold text-green-600">{currentSemester.subjects.length}</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject Code</TableHead>
                      <TableHead>Subject Name</TableHead>
                      <TableHead className="text-center">Credits</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-center">Grade Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSemester.subjects.map((subject) => (
                      <TableRow key={subject.code}>
                        <TableCell className="font-medium">{subject.code}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell className="text-center">{subject.credits}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={subject.grade === 'A' ? 'default' : 'secondary'}>
                            {subject.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{subject.gradePoints.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Grade Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Improvement Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Improvement Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Discrete Math (B-)</p>
                      <p className="text-sm text-yellow-800">Consider additional practice problems and study groups</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Strong Performance</p>
                      <p className="text-sm text-blue-800">Excellent work in Bridging Subject 1 and Communication</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Dean's List Eligible</p>
                      <p className="text-sm text-green-800">Current GPA qualifies for academic honors</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-base">{goal.title}</span>
                    <Badge className={getGoalStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          goal.status === "Achieved" ? "bg-green-500" :
                          goal.status === "On Track" ? "bg-blue-500" :
                          goal.status === "Behind" ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      <span className="font-medium">
                        {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Academic Transcript
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Semesters</SelectItem>
                    {semesterGrades.map((semester) => (
                      <SelectItem key={semester.semesterNumber} value={semester.semester}>
                        {semester.semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {semesterGrades
                .filter(semester => selectedSemester === "All" || semester.semester === selectedSemester)
                .map((semester) => (
                <div key={semester.semesterNumber} className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{semester.semester}</h3>
                    <div className="flex gap-4 text-sm">
                      <span>GPA: <strong>{semester.gpa > 0 ? semester.gpa.toFixed(2) : "In Progress"}</strong></span>
                      <span>CGPA: <strong>{semester.cgpa.toFixed(2)}</strong></span>
                      <span>Credits: <strong>{semester.totalCredits}</strong></span>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject Code</TableHead>
                        <TableHead>Subject Name</TableHead>
                        <TableHead className="text-center">Credits</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-center">Grade Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.subjects.map((subject) => (
                        <TableRow key={subject.code}>
                          <TableCell className="font-medium">{subject.code}</TableCell>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell className="text-center">{subject.credits}</TableCell>
                          <TableCell className="text-center">
                            {subject.grade === "-" ? (
                              <Badge variant="outline">Not Graded</Badge>
                            ) : (
                              <Badge variant={subject.grade.startsWith('A') ? 'default' : 'secondary'}>
                                {subject.grade}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {subject.gradePoints > 0 ? subject.gradePoints.toFixed(1) : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 