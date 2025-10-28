import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function UserProfile() {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Name:</span> {user?.name || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Email:</span> {user?.email || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Role:</span> {user?.role || 'N/A'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

