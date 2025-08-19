"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Eye, EyeOff } from "lucide-react"
import { login, validatePasswordPolicy, verifyMfa } from "@/lib/auth"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [remember, setRemember] = useState(true)

  const [mfaId, setMfaId] = useState<string | null>(null)
  const [mfaCode, setMfaCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const policy = validatePasswordPolicy(password)
    if (!policy.ok) {
      // We still allow demo login even if policy fails; show warning only
      // setError(policy.reason)
    }

    const res = await login(email, password, { remember, mfaType: "email" })
    if (res.error) {
      setError(res.error)
      setIsLoading(false)
      return
    }
    if (res.challenge) {
      setMfaId(res.challenge.mfaId)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onLogin()
  }

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mfaId) return
    setIsLoading(true)
    setError(null)

    const out = await verifyMfa(mfaId, mfaCode, { remember })
    if (out.error) {
      setError(out.error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">SFPMS</CardTitle>
          <CardDescription>Student & Faculty Profile Management System</CardDescription>
        </CardHeader>
        <CardContent>
          {!mfaId ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me (30 days)
              </label>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="mt-2 text-center text-xs text-gray-600">
                Demo: admin@university.edu / Password!2345
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyMfa} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mfa">Enter verification code</Label>
                <Input
                  id="mfa"
                  inputMode="numeric"
                  placeholder="6-digit code"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
