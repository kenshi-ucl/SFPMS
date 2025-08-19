"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Palette,
  Globe,
  Save,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react"

interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  role: string
  department: string
  joinDate: string
  lastLogin: string
  profilePhoto?: string
  bio: string
  preferences: {
    theme: "light" | "dark" | "system"
    language: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    privacy: {
      profileVisibility: "public" | "private" | "department"
      showEmail: boolean
      showPhone: boolean
    }
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    loginSessions: number
  }
}

const mockProfile: UserProfile = {
  id: "1",
  username: "admin",
  email: "admin@university.edu",
  firstName: "System",
  lastName: "Administrator",
  phone: "+1234567890",
  address: "123 University Ave, Campus City",
  role: "Administrator",
  department: "IT Administration",
  joinDate: "2020-01-15",
  lastLogin: "2024-01-20T10:30:00Z",
  bio: "System Administrator responsible for managing the Student & Faculty Profile Management System.",
  preferences: {
    theme: "light",
    language: "en",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      profileVisibility: "department",
      showEmail: true,
      showPhone: false,
    },
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2023-12-01",
    loginSessions: 3,
  },
}

export function ProfileManagement() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    // Password change logic here
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          className="bg-purple-600 hover:bg-purple-700 gap-2"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <User className="w-4 h-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.profilePhoto || "/placeholder.svg"} />
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                    variant="outline"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">@{profile.username}</p>
                <Badge className="mt-2 bg-purple-100 text-purple-800">{profile.role}</Badge>
              </div>
              <div className="w-full space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                {/* Password Change */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange} className="bg-purple-600 hover:bg-purple-700">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">
                          {profile.security.twoFactorEnabled
                            ? "Your account is protected with 2FA"
                            : "Add an extra layer of security to your account"}
                        </p>
                      </div>
                      <Badge variant={profile.security.twoFactorEnabled ? "default" : "secondary"}>
                        {profile.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          security: { ...profile.security, twoFactorEnabled: !profile.security.twoFactorEnabled },
                        })
                      }
                    >
                      {profile.security.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Security Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Password Change</span>
                      <span className="text-sm text-gray-600">
                        {new Date(profile.security.lastPasswordChange).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Sessions</span>
                      <span className="text-sm text-gray-600">{profile.security.loginSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Login</span>
                      <span className="text-sm text-gray-600">{new Date(profile.lastLogin).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                {/* Theme Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Theme</Label>
                        <div className="flex gap-2 mt-2">
                          {["light", "dark", "system"].map((theme) => (
                            <Button
                              key={theme}
                              variant={profile.preferences.theme === theme ? "default" : "outline"}
                              size="sm"
                              onClick={() =>
                                setProfile({
                                  ...profile,
                                  preferences: { ...profile.preferences, theme: theme as "light" | "dark" | "system" },
                                })
                              }
                              className="capitalize"
                            >
                              {theme}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          value={profile.preferences.language}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              preferences: { ...profile.preferences, language: e.target.value },
                            })
                          }
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.notifications.email}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              notifications: { ...profile.preferences.notifications, email: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.notifications.sms}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              notifications: { ...profile.preferences.notifications, sms: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.notifications.push}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              notifications: { ...profile.preferences.notifications, push: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Profile Visibility</Label>
                      <select
                        value={profile.preferences.privacy.profileVisibility}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              privacy: {
                                ...profile.preferences.privacy,
                                profileVisibility: e.target.value as "public" | "private" | "department",
                              },
                            },
                          })
                        }
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="public">Public</option>
                        <option value="department">Department Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Email Address</p>
                        <p className="text-sm text-gray-600">Make your email visible to others</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.privacy.showEmail}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              privacy: { ...profile.preferences.privacy, showEmail: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Phone Number</p>
                        <p className="text-sm text-gray-600">Make your phone number visible to others</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.preferences.privacy.showPhone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              privacy: { ...profile.preferences.privacy, showPhone: e.target.checked },
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Profile updated</p>
                          <p className="text-xs text-gray-500">Updated contact information</p>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Password changed</p>
                          <p className="text-xs text-gray-500">Password updated successfully</p>
                        </div>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Login from new device</p>
                          <p className="text-xs text-gray-500">Logged in from Chrome on Windows</p>
                        </div>
                        <span className="text-xs text-gray-500">3 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
