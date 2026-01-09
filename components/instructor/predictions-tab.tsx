"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const predictionData = [
  { name: "Will Pass", value: 87, confidence: 92 },
  { name: "At Risk", value: 10, confidence: 78 },
  { name: "Will Fail", value: 3, confidence: 85 },
]

const trendData = [
  { week: "Week 1", accuracy: 75 },
  { week: "Week 2", accuracy: 78 },
  { week: "Week 3", accuracy: 82 },
  { week: "Week 4", accuracy: 85 },
  { week: "Week 5", accuracy: 89 },
]

const studentPredictions = [
  { id: 1, name: "Alex Johnson", prediction: "Will Pass", confidence: 94, stress: "Low", engagement: "High" },
  { id: 2, name: "Jordan Smith", prediction: "At Risk", confidence: 72, stress: "High", engagement: "Medium" },
  { id: 3, name: "Casey Williams", prediction: "Will Pass", confidence: 88, stress: "Medium", engagement: "High" },
  { id: 4, name: "Morgan Brown", prediction: "Will Fail", confidence: 81, stress: "Very High", engagement: "Low" },
  { id: 5, name: "Taylor Davis", prediction: "Will Pass", confidence: 91, stress: "Low", engagement: "High" },
]

const predictionColors = {
  "Will Pass": "#10b981",
  "At Risk": "#f59e0b",
  "Will Fail": "#ef4444",
}

export default function PredictionsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">AI Predictions</h2>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Student Pass/Fail Predictions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4f46e5" name="Count" />
            <Bar dataKey="confidence" fill="#06b6d4" name="Confidence %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-gray-600">Predicted Pass Rate</p>
          <p className="mt-2 text-3xl font-bold text-green-600">87%</p>
          <p className="mt-2 text-xs text-gray-500">Based on current performance</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">At-Risk Students</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">10</p>
          <p className="mt-2 text-xs text-gray-500">Recommend intervention</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Prediction Accuracy</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">89%</p>
          <p className="mt-2 text-xs text-gray-500">Historical average</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Prediction Accuracy Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Individual Student Predictions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Student Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Prediction</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Confidence</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Stress Level</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {studentPredictions.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{student.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: predictionColors[student.prediction as keyof typeof predictionColors] }}
                    >
                      {student.prediction}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{student.confidence}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        student.stress === "Low"
                          ? "bg-green-100 text-green-800"
                          : student.stress === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : student.stress === "High"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.stress}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{student.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">AI Recommendations</h3>
        <div className="space-y-3">
          <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="font-medium text-yellow-900">Monitor High Stress Students</p>
            <p className="mt-1 text-sm text-yellow-800">
              27% of students report high stress levels. Consider additional support resources.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="font-medium text-blue-900">Improve Course Clarity</p>
            <p className="mt-1 text-sm text-blue-800">
              Some students found certain concepts unclear. Consider additional explanations or examples.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="font-medium text-green-900">Strong Overall Performance</p>
            <p className="mt-1 text-sm text-green-800">
              95% completion rate and positive feedback indicate course is well-received.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
