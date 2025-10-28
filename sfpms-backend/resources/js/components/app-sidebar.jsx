import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  Building2,
  Calendar,
  FileText,
  User,
  Settings,
  ClipboardList,
  Award,
  TrendingUp,
  UserCircle,
} from "lucide-react"

export function AppSidebar({ activeSection, onSectionChange, currentUser }) {
  const role = currentUser?.role || "admin"

  const adminNav = [
    { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { title: "Users", icon: Users, id: "users" },
    { title: "Profiles", icon: UserCircle, id: "profiles" },
    { title: "Enrollment Management", icon: ClipboardList, id: "enrollment-management" },
    { title: "Courses", icon: BookOpen, id: "courses" },
    { title: "Departments", icon: Building2, id: "departments" },
    { title: "Academic Years", icon: Calendar, id: "academic-years" },
    { title: "Reports", icon: FileText, id: "reports" },
    { title: "Audit Log", icon: FileText, id: "audit-log" },
  ]

  const deptAdminNav = [
    { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { title: "Profiles", icon: UserCircle, id: "profiles" },
    { title: "Application Review", icon: ClipboardList, id: "student-enrollment" },
    { title: "Courses", icon: BookOpen, id: "courses" },
    { title: "Departments", icon: Building2, id: "departments" },
    { title: "Academic Years", icon: Calendar, id: "academic-years" },
    { title: "Reports", icon: FileText, id: "reports" },
  ]

  const facultyNav = [
    { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { title: "My Students", icon: GraduationCap, id: "my-students" },
    { title: "My Courses", icon: BookOpen, id: "my-courses" },
    { title: "Class Schedule", icon: Calendar, id: "class-schedule" },
    { title: "Student Grades", icon: Award, id: "student-grades" },
    { title: "Attendance", icon: ClipboardList, id: "attendance" },
    { title: "Course Reports", icon: FileText, id: "course-reports" },
  ]

  const studentNav = [
    { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
    { title: "My Profile", icon: UserCircle, id: "my-profile" },
    { title: "My Grades", icon: Award, id: "my-grades" },
    { title: "Class Schedule", icon: Calendar, id: "class-schedule" },
    { title: "My Courses", icon: BookOpen, id: "my-courses" },
    { title: "Attendance", icon: ClipboardList, id: "my-attendance" },
    { title: "Academic Progress", icon: TrendingUp, id: "academic-progress" },
  ]

  const navigationItems =
    role === "admin"
      ? adminNav
      : role === "dept_admin"
      ? deptAdminNav
      : role === "faculty"
      ? facultyNav
      : studentNav

  const accountItems = [
    { title: "My Profile", icon: User, id: "profile" },
    { title: "Settings", icon: Settings, id: "settings" },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">SFPMS</h2>
            <p className="text-xs text-gray-500">Student & Faculty Profile Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onSectionChange(item.id)} isActive={activeSection === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onSectionChange(item.id)} isActive={activeSection === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-gray-500">
          <div>Logged in as: {currentUser ? currentUser.username : "guest"} ({role})</div>
          <div>Academic Year: 2024-2025</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

