"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    formTitle: "CS 101 - Introduction to Computer Science",
    formDescription: "End of semester feedback survey for CS 101",
    allowAnonymous: true,
    allowMultipleResponses: false,
    closingDate: "2024-12-15",
    requireEmail: false,
    notifyOnResponse: true,
    responseLimit: "",
    requireLogin: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Survey Settings</h2>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">General Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Survey Title</label>
            <Input
              value={settings.formTitle}
              onChange={(e) => setSettings({ ...settings, formTitle: e.target.value })}
              placeholder="Enter survey title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Survey Description</label>
            <Textarea
              value={settings.formDescription}
              onChange={(e) => setSettings({ ...settings, formDescription: e.target.value })}
              placeholder="Enter survey description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Closing Date</label>
            <Input
              type="date"
              value={settings.closingDate}
              onChange={(e) => setSettings({ ...settings, closingDate: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Access Control</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowAnonymous}
              onChange={(e) => setSettings({ ...settings, allowAnonymous: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Allow Anonymous Responses</span>
              <p className="text-xs text-gray-500 mt-1">Students can submit without providing their name</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireLogin}
              onChange={(e) => setSettings({ ...settings, requireLogin: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Require Login</span>
              <p className="text-xs text-gray-500 mt-1">Only authenticated users can access the survey</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowMultipleResponses}
              onChange={(e) => setSettings({ ...settings, allowMultipleResponses: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Allow Multiple Responses per Student</span>
              <p className="text-xs text-gray-500 mt-1">Students can submit the survey more than once</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireEmail}
              onChange={(e) => setSettings({ ...settings, requireEmail: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Require Email Address</span>
              <p className="text-xs text-gray-500 mt-1">Collect email addresses with responses</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Response Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Limit (Optional)</label>
            <Input
              type="number"
              value={settings.responseLimit}
              onChange={(e) => setSettings({ ...settings, responseLimit: e.target.value })}
              placeholder="Leave empty for unlimited responses"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum number of responses to accept</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifyOnResponse}
              onChange={(e) => setSettings({ ...settings, notifyOnResponse: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <p className="text-xs text-gray-500 mt-1">Receive email when students submit responses</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Survey Link</h3>
        <div className="flex gap-2">
          <Input readOnly value="https://surveyhub.edu/survey/cs101-feedback" className="bg-gray-50" />
          <Button variant="outline">Copy Link</Button>
        </div>
        <p className="text-xs text-gray-500 mt-3">Share this link with students to access the survey</p>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          Save Settings
        </Button>
        {saved && <div className="flex items-center text-green-600 text-sm font-medium">Settings saved successfully</div>}
      </div>
    </div>
  )
}
