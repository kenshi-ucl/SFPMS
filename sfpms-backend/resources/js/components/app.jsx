import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Dashboard } from "@/components/dashboard"
import { DepartmentsManagement } from "@/components/departments-management"
import { AcademicYearsManagement } from "@/components/academic-years-management"
import { UsersManagement } from "@/components/users-management"
import { CoursesManagement } from "@/components/courses-management"
import { ProfilesManagement } from "@/components/profiles-management"
import { AuditLog } from "@/components/audit-log"
import { UserProfile } from "@/components/user-profile"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { NotificationsCenter } from "@/components/notifications-center"
import { ReportsCenter } from "@/components/reports-center"
import { MyGrades } from "@/components/my-grades"
import { SystemSettings } from "@/components/system-settings"
import { EnrollmentManagement } from "@/components/enrollment-management"
import { useAuth } from "@/lib/auth-context"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { isAuthenticated, isLoading, user, logout } = useAuth()


  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        setActiveSection("dashboard")
      } else if (user.role === 'faculty') {
        setActiveSection("dashboard")
      } else if (user.role === 'student') {
        setActiveSection("my-grades")
      }
    }
  }, [isAuthenticated, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "courses":
        return <CoursesManagement />
      case "users":
        return <UsersManagement />
      case "profiles":
        return <ProfilesManagement />
      case "my-profile":
        return <UserProfile />
      case "departments":
        return <DepartmentsManagement />
      case "academic-years":
        return <AcademicYearsManagement />
      case "enrollment-management":
        return <EnrollmentManagement />
      case "reports":
        return <ReportsCenter />
      case "audit-log":
        return <AuditLog />
      case "profile":
        return <UserProfile />
      case "settings":
        return <SystemSettings />
      case "notifications":
        return <NotificationsCenter />
      case "my-grades":
        return <MyGrades />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        currentUser={user ? { username: user.name, role: user.role } : undefined}
      />
      <SidebarInset className="w-full overflow-x-hidden">
        <DashboardHeader 
          onLogout={logout}
          currentUser={user ? { username: user.name } : undefined}
        />
        <main className="flex-1 w-full min-w-0 overflow-x-hidden">
          <div className="p-4 md:p-6 w-full min-w-0">
            {renderActiveSection()}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

