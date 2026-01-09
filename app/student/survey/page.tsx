"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { BarChart3, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

interface Question {
  id: number
  text: string
  type: "text" | "textarea" | "rating" | "multiple-choice" | "checkbox"
  required: boolean
  options?: string[]
}

interface Response {
  [key: string]: string | string[]
}

const SURVEY_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your full name?",
    type: "text",
    required: true,
  },
  {
    id: 2,
    text: "What is your email address?",
    type: "text",
    required: true,
  },
  {
    id: 3,
    text: "How would you rate the course content?",
    type: "rating",
    required: true,
  },
  {
    id: 4,
    text: "Did the instructor explain concepts clearly?",
    type: "multiple-choice",
    required: true,
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"],
  },
  {
    id: 5,
    text: "Which topics were most helpful? (Select all that apply)",
    type: "checkbox",
    required: false,
    options: ["Lectures", "Assignments", "Group Projects", "Discussions", "Readings"],
  },
  {
    id: 6,
    text: "What could be improved in this course?",
    type: "textarea",
    required: false,
  },
]

export default function StudentSurvey() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [responses, setResponses] = useState<Response>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const currentQuestion = SURVEY_QUESTIONS[currentStep]
  const totalSteps = SURVEY_QUESTIONS.length

  const handleResponseChange = (value: string | string[]) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value,
    })
    // Clear error for this field when user starts typing
    if (errors[currentQuestion.id]) {
      setErrors({
        ...errors,
        [currentQuestion.id]: "",
      })
    }
  }

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion.required) return true

    const response = responses[currentQuestion.id]
    if (!response || (Array.isArray(response) && response.length === 0) || response === "") {
      setErrors({
        ...errors,
        [currentQuestion.id]: "This field is required",
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Validate all required fields
    let hasErrors = false
    const newErrors: { [key: string]: string } = {}

    SURVEY_QUESTIONS.forEach((question) => {
      if (question.required) {
        const response = responses[question.id]
        if (!response || (Array.isArray(response) && response.length === 0) || response === "") {
          newErrors[question.id] = "This field is required"
          hasErrors = true
        }
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
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
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Confirmation */}
        <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <div className="mb-4 inline-flex rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
            <p className="mt-2 text-gray-600">
              Your response has been submitted successfully. Your feedback helps us improve.
            </p>
            <Link href="/" className="mt-8 inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700">Return to Home</Button>
            </Link>
          </Card>
        </main>
      </div>
    )
  }

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
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Survey Form */}
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Course Feedback Survey</h1>
              <span className="text-sm font-medium text-gray-600">
                {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion.text}
                {currentQuestion.required && <span className="text-red-600 ml-1">*</span>}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.type === "text" && (
                <Input
                  type="text"
                  placeholder="Enter your answer..."
                  value={(responses[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  aria-invalid={!!errors[currentQuestion.id]}
                />
              )}

              {currentQuestion.type === "textarea" && (
                <Textarea
                  placeholder="Enter your answer..."
                  value={(responses[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  rows={5}
                  aria-invalid={!!errors[currentQuestion.id]}
                />
              )}

              {currentQuestion.type === "rating" && (
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleResponseChange(String(rating))}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        responses[currentQuestion.id] === String(rating)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "multiple-choice" && (
                <RadioGroup
                  value={(responses[currentQuestion.id] as string) || ""}
                  onValueChange={handleResponseChange}
                >
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === "checkbox" && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <div key={option} className="flex items-center gap-3">
                      <Checkbox
                        id={option}
                        checked={(responses[currentQuestion.id] as string[])?.includes(option) || false}
                        onCheckedChange={(checked) => {
                          const current = (responses[currentQuestion.id] as string[]) || []
                          if (checked) {
                            handleResponseChange([...current, option])
                          } else {
                            handleResponseChange(current.filter((item) => item !== option))
                          }
                        }}
                      />
                      <Label htmlFor={option} className="cursor-pointer font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errors[currentQuestion.id] && (
              <p className="mt-3 text-sm text-red-600 font-medium">{errors[currentQuestion.id]}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext} className="gap-2 bg-blue-600 hover:bg-blue-700">
              {currentStep === totalSteps - 1 ? "Submit" : "Next"}
              {currentStep < totalSteps - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
