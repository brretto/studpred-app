"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, Filter } from "lucide-react"

const responseData = [
  { name: "Excellent", value: 45 },
  { name: "Good", value: 32 },
  { name: "Average", value: 18 },
  { name: "Poor", value: 5 },
]

const stressData = [
  { name: "Low (1-3)", value: 28 },
  { name: "Medium (4-6)", value: 45 },
  { name: "High (7-10)", value: 27 },
]

const attendanceData = [
  { range: "0-20%", count: 2 },
  { range: "20-40%", count: 5 },
  { range: "40-60%", count: 12 },
  { range: "60-80%", count: 28 },
  { range: "80-100%", count: 53 },
]

const responseTimelineData = [
  { date: "Day 1", responses: 12 },
  { date: "Day 2", responses: 18 },
  { date: "Day 3", responses: 25 },
  { date: "Day 4", responses: 22 },
  { date: "Day 5", responses: 15 },
  { date: "Day 6", responses: 8 },
]

const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b", "#ef4444"]

interface StudentResponse {
  id: number
  name: string
  email: string
  submittedAt: string
  attendance: number
  stressLevel: number
  rating: string
}

const mockResponses: StudentResponse[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@university.edu",
    submittedAt: "2024-01-15 10:30",
    attendance: 92,
    stressLevel: 3,
    rating: "Excellent",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@university.edu",
    submittedAt: "2024-01-15 11:45",
    attendance: 78,
    stressLevel: 6,
    rating: "Good",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@university.edu",
    submittedAt: "2024-01-15 14:20",
    attendance: 85,
    stressLevel: 5,
    rating: "Good",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@university.edu",
    submittedAt: "2024-01-16 09:15",
    attendance: 65,
    stressLevel: 8,
    rating: "Average",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@university.edu",
    submittedAt: "2024-01-16 13:00",
    attendance: 88,
    stressLevel: 4,
    rating: "Excellent",
  },
]

export default function ResponsesTab() {
  const [filterRating, setFilterRating] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"recent" | "name" | "attendance">("recent")

  const filteredResponses = filterRating ? mockResponses.filter((r) => r.rating === filterRating) : mockResponses

  const sortedResponses = [...filteredResponses].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "attendance":
        return b.attendance - a.attendance
      case "recent":
      default:
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    }
  })

  const avgAttendance = Math.round(mockResponses.reduce((sum, r) => sum + r.attendance, 0) / mockResponses.length)
  const avgStress = (mockResponses.reduce((sum, r) => sum + r.stressLevel, 0) / mockResponses.length).toFixed(1)
  const completionRate = Math.round((mockResponses.length / 100) * 100)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-gray-600 font-medium">Total Responses</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{mockResponses.length}</p>
          <p className="text-xs text-gray-500 mt-2">Out of 100 students</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{completionRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Survey completion</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 font-medium">Avg. Attendance</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{avgAttendance}%</p>
          <p className="text-xs text-gray-500 mt-2">Student attendance rate</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 font-medium">Avg. Stress Level</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{avgStress}/10</p>
          <p className="text-xs text-gray-500 mt-2">Student stress average</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Rating */}
        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-gray-900">Course Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={responseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {responseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Stress Level */}
        <Card className="p-6">
          <h3 className="mb-4 font-semibold text-gray-900">Student Stress Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stressData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Attendance Distribution */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Attendance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Response Timeline */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Response Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={responseTimelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="responses"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ fill: "#4f46e5", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Individual Responses Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Individual Responses</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Filter by rating:</span>
          </div>
          <button
            onClick={() => setFilterRating(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterRating === null ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {["Excellent", "Good", "Average", "Poor"].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilterRating(rating)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterRating === rating
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {rating}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "name" | "attendance")}
            className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name (A-Z)</option>
            <option value="attendance">Attendance (High to Low)</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Attendance</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Stress</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedResponses.map((response) => (
                <tr key={response.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-medium">{response.name}</td>
                  <td className="py-3 px-4 text-gray-600">{response.email}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{response.submittedAt}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs">
                      {response.attendance}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-6 rounded-full font-semibold text-xs ${
                        response.stressLevel <= 3
                          ? "bg-green-100 text-green-700"
                          : response.stressLevel <= 6
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {response.stressLevel}/10
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        response.rating === "Excellent"
                          ? "bg-green-100 text-green-700"
                          : response.rating === "Good"
                            ? "bg-blue-100 text-blue-700"
                            : response.rating === "Average"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {response.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedResponses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No responses match your filters.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
