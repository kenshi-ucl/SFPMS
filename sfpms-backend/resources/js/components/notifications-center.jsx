import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export function NotificationsCenter() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">System, academic, and administrative alerts</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Notifications will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

