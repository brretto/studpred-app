"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit2, Copy, GripVertical } from "lucide-react"

interface Question {
  id: number
  text: string
  type: "text" | "textarea" | "rating" | "multiple-choice" | "checkbox"
  options?: string[]
  required: boolean
  order: number
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "How would you rate the course content?",
    type: "rating",
    required: true,
    order: 1,
  },
  {
    id: 2,
    text: "Did the instructor explain concepts clearly?",
    type: "multiple-choice",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
    required: true,
    order: 2,
  },
  {
    id: 3,
    text: "What could be improved in this course?",
    type: "textarea",
    required: false,
    order: 3,
  },
]

const QUESTION_TYPES = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "rating", label: "Rating Scale (1-5)" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "checkbox", label: "Checkboxes" },
]

export default function QuestionsTab() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    type: "text" as Question["type"],
    options: "",
    required: true,
  })

  const handleAddQuestion = () => {
    if (formData.text.trim()) {
      if (editingId) {
        setQuestions(
          questions.map((q) =>
            q.id === editingId
              ? {
                  ...q,
                  text: formData.text,
                  type: formData.type,
                  options: formData.options ? formData.options.split("\n").filter((o) => o.trim()) : undefined,
                  required: formData.required,
                }
              : q,
          ),
        )
        setEditingId(null)
      } else {
        const newQuestion: Question = {
          id: Math.max(...questions.map((q) => q.id), 0) + 1,
          text: formData.text,
          type: formData.type,
          options: formData.options ? formData.options.split("\n").filter((o) => o.trim()) : undefined,
          required: formData.required,
          order: questions.length + 1,
        }
        setQuestions([...questions, newQuestion])
      }
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      text: "",
      type: "text",
      options: "",
      required: true,
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEditQuestion = (question: Question) => {
    setFormData({
      text: question.text,
      type: question.type,
      options: question.options?.join("\n") || "",
      required: question.required,
    })
    setEditingId(question.id)
    setShowForm(true)
  }

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleDuplicateQuestion = (question: Question) => {
    const newQuestion: Question = {
      ...question,
      id: Math.max(...questions.map((q) => q.id), 0) + 1,
      order: questions.length + 1,
    }
    setQuestions([...questions, newQuestion])
  }

  const handleMoveQuestion = (id: number, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === id)
    if ((direction === "up" && index > 0) || (direction === "down" && index < questions.length - 1)) {
      const newQuestions = [...questions]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      ;[newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]]
      setQuestions(newQuestions)
    }
  }

  const getTypeLabel = (type: Question["type"]) => {
    return QUESTION_TYPES.find((t) => t.value === type)?.label || type
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Survey Questions</h2>
          <p className="text-sm text-gray-600 mt-1">
            {questions.length} question{questions.length !== 1 ? "s" : ""} in your survey
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-indigo-200 bg-indigo-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Question" : "Add New Question"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
              <Textarea
                placeholder="Enter your question..."
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Question["type"] })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {(formData.type === "multiple-choice" || formData.type === "checkbox") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options (one per line)</label>
                <Textarea
                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                  value={formData.options}
                  onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                  rows={4}
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="required"
                checked={formData.required}
                onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600"
              />
              <label htmlFor="required" className="text-sm font-medium text-gray-700">
                Make this question required
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleAddQuestion} className="bg-indigo-600 hover:bg-indigo-700">
                {editingId ? "Update Question" : "Add Question"}
              </Button>
              <Button onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {questions.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-gray-100 p-3">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-600">No questions yet. Add your first question to get started.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 pt-1">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-500 w-6 text-center">{index + 1}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 break-words">{question.text}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                      {getTypeLabel(question.type)}
                    </span>
                    {question.required && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        Required
                      </span>
                    )}
                    {question.options && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                        {question.options.length} options
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditQuestion(question)}
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicateQuestion(question)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Tip:</span> You can reorder questions by dragging them, or use the edit
            button to modify any question.
          </p>
        </Card>
      )}
    </div>
  )
}
