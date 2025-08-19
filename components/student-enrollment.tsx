"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Calendar, Upload, User, GraduationCap, FileText, CheckCircle } from "lucide-react"

interface EnrollmentData {
  // Personal Information
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
  gender: "Male" | "Female" | "Other"
  nationality: string
  bloodGroup: string
  category: "General" | "OBC" | "SC" | "ST" | "Others"
  religion?: string
  
  // Contact Information
  personalEmail: string
  mobileNumber: string
  alternatePhone?: string
  currentAddress: string
  permanentAddress: string
  
  // Parent/Guardian Information
  fatherName: string
  fatherOccupation: string
  fatherContact: string
  motherName: string
  motherOccupation: string
  motherContact: string
  guardianName?: string
  guardianRelation?: string
  guardianContact?: string
  parentEmail: string
  annualIncome?: string
  emergencyContactName: string
  emergencyContactPhone: string
  
  // Previous Education
  schoolName: string
  boardUniversity: string
  yearOfPassing: string
  percentage: string
  entranceExam?: string
  entranceScore?: string
  entranceRank?: string
  
  // Course Selection
  academicYear: string
  courseId: string
  courseName: string
  department: string
  admissionType: "Regular" | "Lateral" | "Transfer"
  preferredSection?: string
  
  // Documents
  documents: {
    birthCertificate: boolean
    marksheets: boolean
    transferCertificate: boolean
    characterCertificate: boolean
    casteCertificate: boolean
    incomeCertificate: boolean
    idProof: boolean
    photos: boolean
  }
  
  // Additional Information
  extracurricular?: string
  medicalConditions?: string
  scholarshipApplied: boolean
  hostelRequired: boolean
  transportRequired: boolean
}

const initialData: EnrollmentData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "Male",
  nationality: "Indian",
  bloodGroup: "O+",
  category: "General",
  personalEmail: "",
  mobileNumber: "",
  currentAddress: "",
  permanentAddress: "",
  fatherName: "",
  fatherOccupation: "",
  fatherContact: "",
  motherName: "",
  motherOccupation: "",
  motherContact: "",
  parentEmail: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  schoolName: "",
  boardUniversity: "",
  yearOfPassing: "",
  percentage: "",
  academicYear: "2024-2025",
  courseId: "",
  courseName: "",
  department: "",
  admissionType: "Regular",
  documents: {
    birthCertificate: false,
    marksheets: false,
    transferCertificate: false,
    characterCertificate: false,
    casteCertificate: false,
    incomeCertificate: false,
    idProof: false,
    photos: false,
  },
  scholarshipApplied: false,
  hostelRequired: false,
  transportRequired: false,
}

const courses = [
  { id: "cs", name: "B.Tech Computer Science", department: "Computer Science", duration: "4 years" },
  { id: "me", name: "B.Tech Mechanical Engineering", department: "Mechanical Engineering", duration: "4 years" },
  { id: "bba", name: "Bachelor of Business Administration", department: "Business Administration", duration: "3 years" },
  { id: "bsc", name: "B.Sc Mathematics", department: "Mathematics", duration: "3 years" },
]

export function StudentEnrollment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Contact Details", icon: FileText },
    { id: 3, title: "Family Information", icon: User },
    { id: 4, title: "Education Background", icon: GraduationCap },
    { id: 5, title: "Course Selection", icon: Calendar },
    { id: 6, title: "Documents & Preferences", icon: Upload },
    { id: 7, title: "Review & Submit", icon: CheckCircle },
  ]

  const updateData = (field: string, value: any) => {
    setEnrollmentData(prev => ({ ...prev, [field]: value }))
  }

  const updateDocuments = (field: string, value: boolean) => {
    setEnrollmentData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: value }
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={enrollmentData.firstName}
                  onChange={(e) => updateData("firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={enrollmentData.middleName || ""}
                  onChange={(e) => updateData("middleName", e.target.value)}
                  placeholder="Enter middle name (optional)"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={enrollmentData.lastName}
                  onChange={(e) => updateData("lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={enrollmentData.dateOfBirth}
                  onChange={(e) => updateData("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup value={enrollmentData.gender} onValueChange={(value) => updateData("gender", value)}>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={enrollmentData.nationality}
                  onChange={(e) => updateData("nationality", e.target.value)}
                  placeholder="Enter nationality"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={enrollmentData.bloodGroup} onValueChange={(value) => updateData("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                      <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={enrollmentData.category} onValueChange={(value) => updateData("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["General", "OBC", "SC", "ST", "Others"].map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="religion">Religion (Optional)</Label>
                <Input
                  id="religion"
                  value={enrollmentData.religion || ""}
                  onChange={(e) => updateData("religion", e.target.value)}
                  placeholder="Enter religion"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personalEmail">Personal Email *</Label>
                <Input
                  id="personalEmail"
                  type="email"
                  value={enrollmentData.personalEmail}
                  onChange={(e) => updateData("personalEmail", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  value={enrollmentData.mobileNumber}
                  onChange={(e) => updateData("mobileNumber", e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <Input
                id="alternatePhone"
                value={enrollmentData.alternatePhone || ""}
                onChange={(e) => updateData("alternatePhone", e.target.value)}
                placeholder="Enter alternate phone number"
              />
            </div>
            <div>
              <Label htmlFor="currentAddress">Current Address *</Label>
              <Textarea
                id="currentAddress"
                value={enrollmentData.currentAddress}
                onChange={(e) => updateData("currentAddress", e.target.value)}
                placeholder="Enter complete current address"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="permanentAddress">Permanent Address *</Label>
              <Textarea
                id="permanentAddress"
                value={enrollmentData.permanentAddress}
                onChange={(e) => updateData("permanentAddress", e.target.value)}
                placeholder="Enter complete permanent address"
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  value={enrollmentData.fatherName}
                  onChange={(e) => updateData("fatherName", e.target.value)}
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <Label htmlFor="fatherOccupation">Father's Occupation *</Label>
                <Input
                  id="fatherOccupation"
                  value={enrollmentData.fatherOccupation}
                  onChange={(e) => updateData("fatherOccupation", e.target.value)}
                  placeholder="Enter father's occupation"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fatherContact">Father's Contact Number *</Label>
              <Input
                id="fatherContact"
                value={enrollmentData.fatherContact}
                onChange={(e) => updateData("fatherContact", e.target.value)}
                placeholder="Enter father's contact number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  value={enrollmentData.motherName}
                  onChange={(e) => updateData("motherName", e.target.value)}
                  placeholder="Enter mother's name"
                />
              </div>
              <div>
                <Label htmlFor="motherOccupation">Mother's Occupation *</Label>
                <Input
                  id="motherOccupation"
                  value={enrollmentData.motherOccupation}
                  onChange={(e) => updateData("motherOccupation", e.target.value)}
                  placeholder="Enter mother's occupation"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="motherContact">Mother's Contact Number *</Label>
              <Input
                id="motherContact"
                value={enrollmentData.motherContact}
                onChange={(e) => updateData("motherContact", e.target.value)}
                placeholder="Enter mother's contact number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentEmail">Parent's Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={enrollmentData.parentEmail}
                  onChange={(e) => updateData("parentEmail", e.target.value)}
                  placeholder="Enter parent's email"
                />
              </div>
              <div>
                <Label htmlFor="annualIncome">Annual Family Income</Label>
                <Input
                  id="annualIncome"
                  value={enrollmentData.annualIncome || ""}
                  onChange={(e) => updateData("annualIncome", e.target.value)}
                  placeholder="Enter annual income"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={enrollmentData.emergencyContactName}
                  onChange={(e) => updateData("emergencyContactName", e.target.value)}
                  placeholder="Enter emergency contact name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={enrollmentData.emergencyContactPhone}
                  onChange={(e) => updateData("emergencyContactPhone", e.target.value)}
                  placeholder="Enter emergency contact phone"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Previous Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName">School/College Name *</Label>
                <Input
                  id="schoolName"
                  value={enrollmentData.schoolName}
                  onChange={(e) => updateData("schoolName", e.target.value)}
                  placeholder="Enter school/college name"
                />
              </div>
              <div>
                <Label htmlFor="boardUniversity">Board/University *</Label>
                <Input
                  id="boardUniversity"
                  value={enrollmentData.boardUniversity}
                  onChange={(e) => updateData("boardUniversity", e.target.value)}
                  placeholder="Enter board/university name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearOfPassing">Year of Passing *</Label>
                <Input
                  id="yearOfPassing"
                  value={enrollmentData.yearOfPassing}
                  onChange={(e) => updateData("yearOfPassing", e.target.value)}
                  placeholder="Enter year of passing"
                />
              </div>
              <div>
                <Label htmlFor="percentage">Percentage/CGPA *</Label>
                <Input
                  id="percentage"
                  value={enrollmentData.percentage}
                  onChange={(e) => updateData("percentage", e.target.value)}
                  placeholder="Enter percentage or CGPA"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entranceExam">Entrance Exam (if applicable)</Label>
                <Input
                  id="entranceExam"
                  value={enrollmentData.entranceExam || ""}
                  onChange={(e) => updateData("entranceExam", e.target.value)}
                  placeholder="Enter entrance exam name"
                />
              </div>
              <div>
                <Label htmlFor="entranceScore">Entrance Score</Label>
                <Input
                  id="entranceScore"
                  value={enrollmentData.entranceScore || ""}
                  onChange={(e) => updateData("entranceScore", e.target.value)}
                  placeholder="Enter entrance score"
                />
              </div>
              <div>
                <Label htmlFor="entranceRank">Entrance Rank</Label>
                <Input
                  id="entranceRank"
                  value={enrollmentData.entranceRank || ""}
                  onChange={(e) => updateData("entranceRank", e.target.value)}
                  placeholder="Enter entrance rank"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Selection</h3>
            <div>
              <Label htmlFor="academicYear">Academic Year *</Label>
              <Select value={enrollmentData.academicYear} onValueChange={(value) => updateData("academicYear", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="courseId">Select Course *</Label>
              <Select value={enrollmentData.courseId} onValueChange={(value) => {
                const course = courses.find(c => c.id === value)
                updateData("courseId", value)
                updateData("courseName", course?.name || "")
                updateData("department", course?.department || "")
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} - {course.duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {enrollmentData.courseId && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold">Selected Course Details:</h4>
                <p><strong>Course:</strong> {enrollmentData.courseName}</p>
                <p><strong>Department:</strong> {enrollmentData.department}</p>
                <p><strong>Duration:</strong> {courses.find(c => c.id === enrollmentData.courseId)?.duration}</p>
              </div>
            )}
            <div>
              <Label htmlFor="admissionType">Admission Type *</Label>
              <RadioGroup value={enrollmentData.admissionType} onValueChange={(value) => updateData("admissionType", value)}>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lateral" id="lateral" />
                    <Label htmlFor="lateral">Lateral Entry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Transfer" id="transfer" />
                    <Label htmlFor="transfer">Transfer</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Documents & Preferences</h3>
            
            <div>
              <h4 className="font-medium mb-3">Required Documents Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries({
                  birthCertificate: "Birth Certificate",
                  marksheets: "Previous Academic Marksheets",
                  transferCertificate: "Transfer Certificate",
                  characterCertificate: "Character Certificate",
                  casteCertificate: "Caste Certificate (if applicable)",
                  incomeCertificate: "Income Certificate (if applicable)",
                  idProof: "ID Proof (Aadhar/Passport)",
                  photos: "Passport Size Photos"
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={enrollmentData.documents[key as keyof typeof enrollmentData.documents]}
                      onCheckedChange={(checked) => updateDocuments(key, checked as boolean)}
                    />
                    <Label htmlFor={key} className="text-sm">{label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Additional Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scholarshipApplied"
                    checked={enrollmentData.scholarshipApplied}
                    onCheckedChange={(checked) => updateData("scholarshipApplied", checked)}
                  />
                  <Label htmlFor="scholarshipApplied">Apply for scholarship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hostelRequired"
                    checked={enrollmentData.hostelRequired}
                    onCheckedChange={(checked) => updateData("hostelRequired", checked)}
                  />
                  <Label htmlFor="hostelRequired">Hostel accommodation required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transportRequired"
                    checked={enrollmentData.transportRequired}
                    onCheckedChange={(checked) => updateData("transportRequired", checked)}
                  />
                  <Label htmlFor="transportRequired">Transport facility required</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="extracurricular">Extracurricular Activities</Label>
              <Textarea
                id="extracurricular"
                value={enrollmentData.extracurricular || ""}
                onChange={(e) => updateData("extracurricular", e.target.value)}
                placeholder="List any extracurricular activities, achievements, or interests"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
              <Textarea
                id="medicalConditions"
                value={enrollmentData.medicalConditions || ""}
                onChange={(e) => updateData("medicalConditions", e.target.value)}
                placeholder="Mention any medical conditions or allergies"
                rows={2}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Application</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {enrollmentData.firstName} {enrollmentData.middleName} {enrollmentData.lastName}</p>
                  <p><strong>Date of Birth:</strong> {enrollmentData.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {enrollmentData.gender}</p>
                  <p><strong>Category:</strong> {enrollmentData.category}</p>
                  <p><strong>Blood Group:</strong> {enrollmentData.bloodGroup}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {enrollmentData.personalEmail}</p>
                  <p><strong>Mobile:</strong> {enrollmentData.mobileNumber}</p>
                  <p><strong>Emergency Contact:</strong> {enrollmentData.emergencyContactName}</p>
                  <p><strong>Emergency Phone:</strong> {enrollmentData.emergencyContactPhone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Family Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Father:</strong> {enrollmentData.fatherName}</p>
                  <p><strong>Mother:</strong> {enrollmentData.motherName}</p>
                  <p><strong>Parent Email:</strong> {enrollmentData.parentEmail}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Course Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Academic Year:</strong> {enrollmentData.academicYear}</p>
                  <p><strong>Course:</strong> {enrollmentData.courseName}</p>
                  <p><strong>Department:</strong> {enrollmentData.department}</p>
                  <p><strong>Admission Type:</strong> {enrollmentData.admissionType}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h4 className="font-medium mb-2">Document Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(enrollmentData.documents).map(([key, submitted]) => (
                  <Badge key={key} variant={submitted ? "default" : "secondary"} className="justify-center">
                    {submitted ? "✓" : "✗"} {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Important Notes:</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Please ensure all information is accurate before submitting</li>
                <li>• You will receive a confirmation email after successful submission</li>
                <li>• Admission is subject to document verification and availability of seats</li>
                <li>• Fee payment details will be shared via email</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return enrollmentData.firstName && enrollmentData.lastName && enrollmentData.dateOfBirth && enrollmentData.gender
      case 2:
        return enrollmentData.personalEmail && enrollmentData.mobileNumber && enrollmentData.currentAddress && enrollmentData.permanentAddress
      case 3:
        return enrollmentData.fatherName && enrollmentData.motherName && enrollmentData.parentEmail && enrollmentData.emergencyContactName && enrollmentData.emergencyContactPhone
      case 4:
        return enrollmentData.schoolName && enrollmentData.boardUniversity && enrollmentData.yearOfPassing && enrollmentData.percentage
      case 5:
        return enrollmentData.academicYear && enrollmentData.courseId && enrollmentData.admissionType
      case 6:
        return true // Optional step
      case 7:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Application submitted successfully! You will receive a confirmation email shortly.")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Enrollment</h1>
        <p className="text-gray-600">Complete your enrollment application</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? "text-purple-600" : "text-gray-500"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-purple-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 7 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
                disabled={!canProceed()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 