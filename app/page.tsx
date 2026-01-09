"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Users, BarChart3 } from "lucide-react"

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState<"student" | "instructor" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PassSight</span>
            </div>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Empowering educators to predict, prepare, and help students succeed.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Gain data-driven insights from student surveys to identify at-risk learners early and guide them toward success.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Student Card */}
          <Card className="relative overflow-hidden border-2 border-transparent transition-all hover:border-blue-400 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50" />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Student</h2>
              <p className="mt-2 text-gray-600">
                Respond to surveys and share your feedback to help improve your learning experience.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Quick and easy surveys
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Anonymous responses
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Real-time feedback
                </li>
              </ul>
              <Link href="/login?role=student" className="mt-8 block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue as Student</Button>
              </Link>
            </div>
          </Card>

          {/* Instructor Card */}
          <Card className="relative overflow-hidden border-2 border-transparent transition-all hover:border-indigo-400 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-50" />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-lg bg-indigo-100 p-3">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Instructor</h2>
              <p className="mt-2 text-gray-600">
                Create surveys, manage responses, and gain actionable insights from student feedback.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  AI predictions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Detailed reports
                </li>
              </ul>
              <Link href="/login?role=instructor" className="mt-8 block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Continue as Instructor</Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <p className="mt-2 text-gray-600">Anonymous & Secure</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">Real-time</div>
            <p className="mt-2 text-gray-600">Live Analytics</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">AI-Powered</div>
            <p className="mt-2 text-gray-600">Smart Insights</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white/50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
          <p>© 2025 PassSight. Empowering educators to predict, prepare, and help students succeed.</p>
          <p>Designed for schools and institutions passionate about student growth.</p>
        </div>
      </footer>
    </div>
  )
}
