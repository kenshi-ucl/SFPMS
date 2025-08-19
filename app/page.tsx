"use client"

import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Dashboard } from "@/components/dashboard"
import { StudentsManagement } from "@/components/students-management"
import { FacultyManagement } from "@/components/faculty-management"
import { DepartmentsManagement } from "@/components/departments-management"
import { AcademicYearsManagement } from "@/components/academic-years-management"
import { UsersManagement } from "@/components/users-management"
import { CoursesManagement } from "@/components/courses-management"
import { AuditLog } from "@/components/audit-log"
import { UserProfile } from "@/components/user-profile"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getActiveSession } from "@/lib/auth"
import { NotificationsCenter } from "@/components/notifications-center"
import { ReportsCenter } from "@/components/reports-center"
import { MyStudents } from "@/components/my-students"
import { MyGrades } from "@/components/my-grades"
import { SystemSettings } from "@/components/system-settings"
import { StudentEnrollment } from "@/components/student-enrollment"
import { EnrollmentManagement } from "@/components/enrollment-management"
import { DeptEnrollmentManagement } from "@/components/dept-enrollment-management"
import { FacultyCourses } from "@/components/faculty-courses"
import { FacultySchedule } from "@/components/faculty-schedule"
import { FacultyStudentGrades } from "@/components/faculty-student-grades"
import { FacultyAttendance } from "@/components/faculty-attendance"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getActiveSession> extends infer T ? T extends { user: infer U } ? U : any : any>()

  useEffect(() => {
    const session = getActiveSession()
    setIsLoggedIn(!!session)
    if (session?.user) {
      setCurrentUser(session.user)
      setActiveSection("dashboard") // All roles start with dashboard
    }
  }, [])

  if (!isLoggedIn) {
    return (
      <LoginForm
        onLogin={() => {
          const s = getActiveSession()
          setIsLoggedIn(true)
          if (s?.user) {
            setCurrentUser(s.user)
            setActiveSection("dashboard")
          }
        }}
      />
    )
  }

  const renderActiveSection = () => {
    const role = currentUser?.role || "admin"
    
    // Common sections for all roles
    if (activeSection === "dashboard") return <Dashboard />
    if (activeSection === "profile") return <UserProfile />
    if (activeSection === "notifications") return <NotificationsCenter />

    // Admin-only sections
    if (role === "admin") {
      switch (activeSection) {
        case "users": return <UsersManagement />
        case "faculty": return <FacultyManagement />
        case "students": return <StudentsManagement />
        case "enrollment-management": return <EnrollmentManagement />
        case "courses": return <CoursesManagement />
        case "departments": return <DepartmentsManagement />
        case "academic-years": return <AcademicYearsManagement />
        case "reports": return <ReportsCenter />
        case "audit-log": return <AuditLog />
        case "settings": return <SystemSettings />
        default: return <Dashboard />
      }
    }

    // Department Admin sections
    if (role === "dept_admin") {
      switch (activeSection) {
        case "faculty": return <FacultyManagement />
        case "students": return <StudentsManagement />
        case "student-enrollment": return <DeptEnrollmentManagement />
        case "courses": return <CoursesManagement />
        case "departments": return <DepartmentsManagement />
        case "academic-years": return <AcademicYearsManagement />
        case "reports": return <ReportsCenter />
        case "settings": return <SystemSettings />
        default: return <Dashboard />
      }
    }

    // Faculty-only sections  
    if (role === "faculty") {
      switch (activeSection) {
        case "my-students": return <MyStudents />
        case "my-courses": return <FacultyCourses />
        case "class-schedule": return <FacultySchedule />
        case "student-grades": return <FacultyStudentGrades />
        case "attendance": return <FacultyAttendance />
        case "course-reports": return <div className="p-6"><h1 className="text-3xl font-bold">Course Reports</h1><p>Course reports coming soon...</p></div>
        case "settings": return <UserProfile />
        default: return <Dashboard />
      }
    }

    // Student-only sections
    if (role === "student") {
      switch (activeSection) {
        case "my-grades": return <MyGrades />
        case "class-schedule": return <div className="p-6"><h1 className="text-3xl font-bold">Class Schedule</h1><p>Your class schedule coming soon...</p></div>
        case "my-courses": return <div className="p-6"><h1 className="text-3xl font-bold">My Courses</h1><p>Your enrolled courses coming soon...</p></div>
        case "my-attendance": return <div className="p-6"><h1 className="text-3xl font-bold">My Attendance</h1><p>Your attendance record coming soon...</p></div>
        case "academic-progress": return <div className="p-6"><h1 className="text-3xl font-bold">Academic Progress</h1><p>Your academic progress tracking coming soon...</p></div>
        case "settings": return <UserProfile />
        default: return <Dashboard />
      }
    }

    // Fallback
    return <Dashboard />
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} currentUser={currentUser as any} />
      <SidebarInset>
        <DashboardHeader onLogout={() => { setIsLoggedIn(false); setCurrentUser(undefined as any); }} currentUser={currentUser as any} />
        <main className="flex-1 overflow-auto">{renderActiveSection()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
