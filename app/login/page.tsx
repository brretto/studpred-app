"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { BarChart3 } from "lucide-react"

export default function Login() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get("role") || "student"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Route based on role
    if (role === "instructor") {
      router.push("/instructor/dashboard")
    } else {
      router.push("/student/survey")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PassSight</span>
        </Link>

        {/* Login Card */}
        <Card className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in as <span className="font-semibold capitalize">{role}</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
