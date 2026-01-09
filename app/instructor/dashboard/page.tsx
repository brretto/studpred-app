"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, LogOut, Menu, X, FileText, ItalicIcon as AnalyticsIcon, Sparkles, Settings } from "lucide-react"
import QuestionsTab from "@/components/instructor/questions-tab"
import ResponsesTab from "@/components/instructor/responses-tab"
import PredictionsTab from "@/components/instructor/predictions-tab"
import SettingsTab from "@/components/instructor/settings-tab"

interface TabConfig {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

const TABS: TabConfig[] = [
  {
    id: "questions",
    label: "Questions",
    icon: <FileText className="h-5 w-5" />,
    description: "Manage survey questions",
  },
  {
    id: "responses",
    label: "Responses",
    icon: <AnalyticsIcon className="h-5 w-5" />,
    description: "View student responses",
  },
  {
    id: "predictions",
    label: "Predictions",
    icon: <Sparkles className="h-5 w-5" />,
    description: "AI-powered insights",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    description: "Survey configuration",
  },
]

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("questions")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const currentTab = TABS.find((tab) => tab.id === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">PassSight</span>
                <p className="text-xs text-gray-500">Instructor Dashboard</p>
              </div>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* User Profile Card */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Logged in as</p>
                <p className="mt-2 text-lg font-bold text-gray-900">Dr. Sarah Smith</p>
                <p className="text-sm text-gray-600">instructor@university.edu</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 ${
                      activeTab === tab.id
                        ? "bg-indigo-100 text-indigo-900 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className={activeTab === tab.id ? "text-indigo-600" : "text-gray-400"}>{tab.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{tab.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{tab.description}</p>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Quick Stats</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Responses</span>
                    <span className="font-bold text-gray-900">100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Questions</span>
                    <span className="font-bold text-indigo-600">6</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">{currentTab?.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{currentTab?.label}</h1>
                  <p className="text-gray-600 mt-1">{currentTab?.description}</p>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "questions" && <QuestionsTab />}
              {activeTab === "responses" && <ResponsesTab />}
              {activeTab === "predictions" && <PredictionsTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
