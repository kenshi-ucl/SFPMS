"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Download, Upload, Eye, Edit, Trash2, UserCheck, Mail, Phone, BookOpen, Trash, Award } from "lucide-react"

interface Faculty {
  id: string
  employeeId: string
  title: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  joiningDate: string
  employmentStatus: "Active" | "On_Leave" | "Sabbatical" | "Resigned" | "Retired"
  specializations: string[]
  qualifications: Qualification[]
  experience: Experience[]
  research: Research[]
  recognitions: Recognition[]
  teachingLoad: number
  feedbackRating: number
  profilePhoto?: string
}

interface Qualification {
  id: string
  degreeType: string
  fieldOfStudy: string
  institution: string
  yearCompletion: number
  gradeCgpa: string
}

interface Experience {
  id: string
  institutionName: string
  positionHeld: string
  fromDate: string
  toDate?: string
  isCurrent: boolean
  responsibilities: string
}

interface Research {
  id: string
  researchType: string
  title: string
  journalConference: string
  publicationYear: number
  doi?: string
  coAuthors?: string
}

interface Recognition {
  id: string
  awardName: string
  awardingBody: string
  awardDate: string
  description: string
}

const mockFaculty: Faculty[] = [
  {
    id: "1",
    employeeId: "FAC001",
    title: "Dr.",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@university.edu",
    phone: "+1234567890",
    department: "Computer Science",
    designation: "Professor",
    joiningDate: "2015-08-15",
    employmentStatus: "Active",
    specializations: ["Machine Learning", "Data Science", "Artificial Intelligence"],
    qualifications: [
      {
        id: "1",
        degreeType: "PhD",
        fieldOfStudy: "Computer Science",
        institution: "MIT",
        yearCompletion: 2010,
        gradeCgpa: "3.9",
      },
    ],
    experience: [
      {
        id: "1",
        institutionName: "Google Research",
        positionHeld: "Senior Research Scientist",
        fromDate: "2010-01-01",
        toDate: "2015-07-31",
        isCurrent: false,
        responsibilities: "Led machine learning research projects",
      },
    ],
    research: [
      {
        id: "1",
        researchType: "Paper",
        title: "Advanced Machine Learning Techniques",
        journalConference: "Nature Machine Intelligence",
        publicationYear: 2023,
        doi: "10.1038/s42256-023-00123-4",
      },
    ],
    recognitions: [
      {
        id: "1",
        awardName: "Best Researcher Award",
        awardingBody: "IEEE",
        awardDate: "2023-06-15",
        description: "Outstanding contribution to machine learning research",
      },
    ],
    teachingLoad: 12,
    feedbackRating: 4.8,
  },
]

export function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({
    qualifications: [],
    experience: [],
    research: [],
    recognitions: [],
    specializations: [],
  })

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !selectedDepartment || member.department === selectedDepartment
    const matchesDesignation = !selectedDesignation || member.designation === selectedDesignation
    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On_Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Sabbatical":
        return "bg-blue-100 text-blue-800"
      case "Resigned":
        return "bg-red-100 text-red-800"
      case "Retired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AddFacultyForm = () => {
    const steps = [
      { id: 1, title: "Personal Information" },
      { id: 2, title: "Contact & Professional" },
      { id: 3, title: "Qualifications" },
      { id: 4, title: "Experience" },
      { id: 5, title: "Research & Recognitions" },
      { id: 6, title: "Review" },
    ]

    const addQualification = () => {
      const newQual: Qualification = {
        id: Date.now().toString(),
        degreeType: "",
        fieldOfStudy: "",
        institution: "",
        yearCompletion: new Date().getFullYear(),
        gradeCgpa: "",
      }
      setNewFaculty({
        ...newFaculty,
        qualifications: [...(newFaculty.qualifications || []), newQual],
      })
    }

    const updateQualification = (id: string, field: keyof Qualification, value: any) => {
      setNewFaculty({
        ...newFaculty,
        qualifications: newFaculty.qualifications?.map((qual) => (qual.id === id ? { ...qual, [field]: value } : qual)),
      })
    }

    const removeQualification = (id: string) => {
      setNewFaculty({
        ...newFaculty,
        qualifications: newFaculty.qualifications?.filter((qual) => qual.id !== id),
      })
    }

    const addExperience = () => {
      const newExp: Experience = {
        id: Date.now().toString(),
        institutionName: "",
        positionHeld: "",
        fromDate: "",
        isCurrent: false,
        responsibilities: "",
      }
      setNewFaculty({
        ...newFaculty,
        experience: [...(newFaculty.experience || []), newExp],
      })
    }

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
      setNewFaculty({
        ...newFaculty,
        experience: newFaculty.experience?.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
      })
    }

    const removeExperience = (id: string) => {
      setNewFaculty({
        ...newFaculty,
        experience: newFaculty.experience?.filter((exp) => exp.id !== id),
      })
    }

    const addResearch = () => {
      const newRes: Research = {
        id: Date.now().toString(),
        researchType: "",
        title: "",
        journalConference: "",
        publicationYear: new Date().getFullYear(),
      }
      setNewFaculty({
        ...newFaculty,
        research: [...(newFaculty.research || []), newRes],
      })
    }

    const updateResearch = (id: string, field: keyof Research, value: any) => {
      setNewFaculty({
        ...newFaculty,
        research: newFaculty.research?.map((res) => (res.id === id ? { ...res, [field]: value } : res)),
      })
    }

    const removeResearch = (id: string) => {
      setNewFaculty({
        ...newFaculty,
        research: newFaculty.research?.filter((res) => res.id !== id),
      })
    }

    const addRecognition = () => {
      const newAward: Recognition = {
        id: Date.now().toString(),
        awardName: "",
        awardingBody: "",
        awardDate: "",
        description: "",
      }
      setNewFaculty({
        ...newFaculty,
        recognitions: [...(newFaculty.recognitions || []), newAward],
      })
    }

    const updateRecognition = (id: string, field: keyof Recognition, value: any) => {
      setNewFaculty({
        ...newFaculty,
        recognitions: newFaculty.recognitions?.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
      })
    }

    const removeRecognition = (id: string) => {
      setNewFaculty({
        ...newFaculty,
        recognitions: newFaculty.recognitions?.filter((award) => award.id !== id),
      })
    }

    const renderStepContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Select onValueChange={(value) => setNewFaculty({ ...newFaculty, title: value })} defaultValue="Mr">
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr.</SelectItem>
                      <SelectItem value="Ms">Ms.</SelectItem>
                      <SelectItem value="Dr">Dr.</SelectItem>
                      <SelectItem value="Prof">Prof.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={newFaculty.firstName || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={newFaculty.lastName || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={newFaculty.middleName || ""}
                  onChange={(e) => setNewFaculty({ ...newFaculty, middleName: e.target.value })}
                  placeholder="Enter middle name (optional)"
                />
              </div>
            </div>
          )
        case 2:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newFaculty.email || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newFaculty.phone || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    onValueChange={(value) => setNewFaculty({ ...newFaculty, department: value })}
                    defaultValue="Computer Science"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Business Administration">Business Administration</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="designation">Designation *</Label>
                  <Select
                    onValueChange={(value) => setNewFaculty({ ...newFaculty, designation: value })}
                    defaultValue="Professor"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                      <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="joiningDate">Joining Date *</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={newFaculty.joiningDate || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, joiningDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="teachingLoad">Teaching Load (hours/week)</Label>
                  <Input
                    id="teachingLoad"
                    type="number"
                    value={newFaculty.teachingLoad || ""}
                    onChange={(e) => setNewFaculty({ ...newFaculty, teachingLoad: Number.parseInt(e.target.value) })}
                    placeholder="Enter teaching load"
                  />
                </div>
              </div>
            </div>
          )
        case 3:
          return (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Academic Qualifications</h3>
                <Button onClick={addQualification} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Qualification
                </Button>
              </div>
              <div className="space-y-4">
                {newFaculty.qualifications?.map((qual) => (
                  <Card key={qual.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Qualification {newFaculty.qualifications?.indexOf(qual)! + 1}</h4>
                        <Button
                          onClick={() => removeQualification(qual.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Degree Type</Label>
                          <Select
                            onValueChange={(value) => updateQualification(qual.id, "degreeType", value)}
                            defaultValue="PhD"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PhD">PhD</SelectItem>
                              <SelectItem value="Masters">Masters</SelectItem>
                              <SelectItem value="Bachelors">Bachelors</SelectItem>
                              <SelectItem value="Diploma">Diploma</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Field of Study</Label>
                          <Input
                            value={qual.fieldOfStudy}
                            onChange={(e) => updateQualification(qual.id, "fieldOfStudy", e.target.value)}
                            placeholder="Enter field of study"
                          />
                        </div>
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={qual.institution}
                            onChange={(e) => updateQualification(qual.id, "institution", e.target.value)}
                            placeholder="Enter institution name"
                          />
                        </div>
                        <div>
                          <Label>Year of Completion</Label>
                          <Input
                            type="number"
                            value={qual.yearCompletion}
                            onChange={(e) =>
                              updateQualification(qual.id, "yearCompletion", Number.parseInt(e.target.value))
                            }
                            placeholder="Enter year"
                          />
                        </div>
                        <div>
                          <Label>Grade/CGPA</Label>
                          <Input
                            value={qual.gradeCgpa}
                            onChange={(e) => updateQualification(qual.id, "gradeCgpa", e.target.value)}
                            placeholder="Enter grade or CGPA"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        case 4:
          return (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Professional Experience</h3>
                <Button onClick={addExperience} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              <div className="space-y-4">
                {newFaculty.experience?.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {newFaculty.experience?.indexOf(exp)! + 1}</h4>
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Institution Name</Label>
                          <Input
                            value={exp.institutionName}
                            onChange={(e) => updateExperience(exp.id, "institutionName", e.target.value)}
                            placeholder="Enter institution name"
                          />
                        </div>
                        <div>
                          <Label>Position Held</Label>
                          <Input
                            value={exp.positionHeld}
                            onChange={(e) => updateExperience(exp.id, "positionHeld", e.target.value)}
                            placeholder="Enter position"
                          />
                        </div>
                        <div>
                          <Label>From Date</Label>
                          <Input
                            type="date"
                            value={exp.fromDate}
                            onChange={(e) => updateExperience(exp.id, "fromDate", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>To Date</Label>
                          <Input
                            type="date"
                            value={exp.toDate || ""}
                            onChange={(e) => updateExperience(exp.id, "toDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Key Responsibilities</Label>
                        <Textarea
                          value={exp.responsibilities}
                          onChange={(e) => updateExperience(exp.id, "responsibilities", e.target.value)}
                          placeholder="Describe key responsibilities and achievements"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        case 5:
          return (
            <div className="space-y-6">
              {/* Research Publications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Research Publications</h3>
                  <Button onClick={addResearch} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Research
                  </Button>
                </div>
                <div className="space-y-4">
                  {newFaculty.research?.map((res) => (
                    <Card key={res.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Research {newFaculty.research?.indexOf(res)! + 1}</h4>
                          <Button
                            onClick={() => removeResearch(res.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Research Type</Label>
                            <Select
                              onValueChange={(value) => updateResearch(res.id, "researchType", value)}
                              defaultValue="Paper"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Paper">Paper</SelectItem>
                                <SelectItem value="Book">Book</SelectItem>
                                <SelectItem value="Patent">Patent</SelectItem>
                                <SelectItem value="Conference">Conference</SelectItem>
                                <SelectItem value="Grant">Grant</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Publication Year</Label>
                            <Input
                              type="number"
                              value={res.publicationYear}
                              onChange={(e) =>
                                updateResearch(res.id, "publicationYear", Number.parseInt(e.target.value))
                              }
                              placeholder="Enter year"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Title</Label>
                            <Input
                              value={res.title}
                              onChange={(e) => updateResearch(res.id, "title", e.target.value)}
                              placeholder="Enter research title"
                            />
                          </div>
                          <div>
                            <Label>Journal/Conference</Label>
                            <Input
                              value={res.journalConference}
                              onChange={(e) => updateResearch(res.id, "journalConference", e.target.value)}
                              placeholder="Enter journal or conference name"
                            />
                          </div>
                          <div>
                            <Label>DOI/ISBN</Label>
                            <Input
                              value={res.doi || ""}
                              onChange={(e) => updateResearch(res.id, "doi", e.target.value)}
                              placeholder="Enter DOI or ISBN"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Co-Authors</Label>
                            <Input
                              value={res.coAuthors || ""}
                              onChange={(e) => updateResearch(res.id, "coAuthors", e.target.value)}
                              placeholder="Enter co-authors (comma separated)"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recognitions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Awards & Recognition</h3>
                  <Button onClick={addRecognition} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Recognition
                  </Button>
                </div>
                <div className="space-y-4">
                  {newFaculty.recognitions?.map((award) => (
                    <Card key={award.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Recognition {newFaculty.recognitions?.indexOf(award)! + 1}</h4>
                          <Button
                            onClick={() => removeRecognition(award.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Award Name</Label>
                            <Input
                              value={award.awardName}
                              onChange={(e) => updateRecognition(award.id, "awardName", e.target.value)}
                              placeholder="Enter award name"
                            />
                          </div>
                          <div>
                            <Label>Awarding Body</Label>
                            <Input
                              value={award.awardingBody}
                              onChange={(e) => updateRecognition(award.id, "awardingBody", e.target.value)}
                              placeholder="Enter awarding organization"
                            />
                          </div>
                          <div>
                            <Label>Award Date</Label>
                            <Input
                              type="date"
                              value={award.awardDate}
                              onChange={(e) => updateRecognition(award.id, "awardDate", e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={award.description}
                              onChange={(e) => updateRecognition(award.id, "description", e.target.value)}
                              placeholder="Enter award description"
                              rows={2}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )
        case 6:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Faculty Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {newFaculty.title} {newFaculty.firstName} {newFaculty.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {newFaculty.email}
                </div>
                <div>
                  <strong>Phone:</strong> {newFaculty.phone}
                </div>
                <div>
                  <strong>Department:</strong> {newFaculty.department}
                </div>
                <div>
                  <strong>Designation:</strong> {newFaculty.designation}
                </div>
                <div>
                  <strong>Joining Date:</strong> {newFaculty.joiningDate}
                </div>
                <div>
                  <strong>Teaching Load:</strong> {newFaculty.teachingLoad} hours/week
                </div>
                <div>
                  <strong>Qualifications:</strong> {newFaculty.qualifications?.length || 0}
                </div>
                <div>
                  <strong>Experience:</strong> {newFaculty.experience?.length || 0} positions
                </div>
                <div>
                  <strong>Research:</strong> {newFaculty.research?.length || 0} publications
                </div>
                <div>
                  <strong>Recognitions:</strong> {newFaculty.recognitions?.length || 0} recognitions
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step.id ? "text-purple-600" : "text-gray-500"}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-purple-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 6 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Add faculty logic here
                const employeeId = `FAC${String(faculty.length + 1).padStart(3, "0")}`
                const completeFaculty: Faculty = {
                  ...newFaculty,
                  id: String(faculty.length + 1),
                  employeeId,
                  employmentStatus: "Active",
                  feedbackRating: 0,
                } as Faculty
                setFaculty([...faculty, completeFaculty])
                setIsAddDialogOpen(false)
                setCurrentStep(1)
                setNewFaculty({
                  qualifications: [],
                  experience: [],
                  research: [],
                  recognitions: [],
                  specializations: [],
                })
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Faculty
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty profiles and academic information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Plus className="w-4 h-4" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Faculty Member</DialogTitle>
              </DialogHeader>
              <AddFacultyForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-gray-900">95</p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Faculty</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Professors</p>
                <p className="text-2xl font-bold text-blue-600">25</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publications</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty List ({filteredFaculty.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFaculty.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.title} {member.firstName} {member.lastName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-4 h-4" />
                          {member.employeeId}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.department}</p>
                      <p className="text-xs text-gray-500">{member.designation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Load: {member.teachingLoad}h</p>
                      <p className="text-xs text-gray-500">Rating: {member.feedbackRating}/5</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.research.length} Publications</p>
                      <p className="text-xs text-gray-500">{member.recognitions.length} Awards</p>
                    </div>
                    <Badge className={getStatusColor(member.employmentStatus)}>
                      {member.employmentStatus.replace("_", " ")}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {member.specializations.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {member.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
