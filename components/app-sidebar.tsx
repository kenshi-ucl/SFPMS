"use client"

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
} from "lucide-react"

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      title: "Users",
      icon: Users,
      id: "users",
    },
    {
      title: "Courses",
      icon: BookOpen,
      id: "courses",
    },
    {
      title: "Students",
      icon: GraduationCap,
      id: "students",
    },
    {
      title: "Faculty",
      icon: UserCheck,
      id: "faculty",
    },
    {
      title: "Departments",
      icon: Building2,
      id: "departments",
    },
    {
      title: "Academic Years",
      icon: Calendar,
      id: "academic-years",
    },
    {
      title: "Audit Log",
      icon: FileText,
      id: "audit-log",
    },
  ]

  const accountItems = [
    {
      title: "My Profile",
      icon: User,
      id: "profile",
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
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
          <div>Logged in as: Administrator</div>
          <div>Academic Year: 2024-2025</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
