import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export function EnrollmentManagement() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enrollment Management</h1>
        <p className="text-gray-600">Manage student enrollments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Enrollment Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Enrollment management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

