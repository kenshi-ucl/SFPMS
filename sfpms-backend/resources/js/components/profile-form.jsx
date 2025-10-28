import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, Send, User, MapPin, GraduationCap, Users, Heart, Shield, Briefcase, Info, CheckCircle } from "lucide-react"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export function ProfileForm({ profile, mode = "create", onSuccess, onCancel }) {
  const { user: currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(false)
  const [currentProfileId, setCurrentProfileId] = useState(profile?.id || null)
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [formData, setFormData] = useState({
    user_id: currentUser?.id || '',
    // Course Information
    department_id: '',
    course_id: '',
    course: '',
    classified_as: 'CONTINUING',
    
    // Personal Information
    family_name: '',
    given_name: '',
    middle_name: '',
    gender: '',
    blood_type: '',
    date_of_birth: '',
    height: '',
    place_of_birth: '',
    civil_status: 'Single',
    
    // Current Address
    current_house_street: '',
    current_barangay: '',
    current_region: 'REGION XIII (Caraga)',
    current_province: '',
    current_municipality: '',
    current_zip_code: '',
    
    // Permanent Address
    permanent_house_street: '',
    permanent_barangay: '',
    permanent_region: 'REGION XIII (Caraga)',
    permanent_province: '',
    permanent_municipality: '',
    permanent_zip_code: '',
    
    // Contact
    religion: '',
    citizenship: 'Filipino',
    contact_phone: '',
    contact_mobile: '',
    email: '',
    
    // Languages
    language_english: false,
    language_filipino: false,
    language_cebuano: false,
    language_others: '',
    
    // Elementary
    elementary_school_name: '',
    elementary_school_address: '',
    elementary_year_graduated: '',
    elementary_school_type: '',
    
    // JHS
    jhs_school_name: '',
    jhs_school_address: '',
    jhs_year_graduated: '',
    jhs_school_type: '',
    
    // SHS
    shs_school_name: '',
    shs_school_address: '',
    shs_year_graduated: '',
    shs_school_type: '',
    
    // College
    college_school_name: '',
    college_school_address: '',
    college_year_graduated: '',
    college_school_type: '',
    
    // Mother
    mother_maiden_name: '',
    mother_first_name: '',
    mother_middle_name: '',
    mother_occupation: '',
    
    // Father
    father_family_name: '',
    father_given_name: '',
    father_middle_name: '',
    father_occupation: '',
    
    // Siblings
    number_of_brothers: 0,
    number_of_sisters: 0,
    
    // Home Address
    home_address: '',
    home_zip_code: '',
    home_municipality: '',
    home_province: '',
    home_phone: '',
    home_mobile: '',
    
    // Guardian
    guardian_family_name: '',
    guardian_given_name: '',
    guardian_middle_name: '',
    guardian_relationship: '',
    guardian_relationship_others: '',
    guardian_address: '',
    guardian_phone: '',
    guardian_mobile: '',
    
    // Spouse
    spouse_family_name: '',
    spouse_given_name: '',
    spouse_middle_name: '',
    number_of_children: 0,
    spouse_occupation: '',
    
    // Insurance
    insurance_beneficiary_family_name: '',
    insurance_beneficiary_given_name: '',
    insurance_beneficiary_middle_name: '',
    insurance_beneficiary_dob: '',
    
    // Financial
    financial_support: '',
    monthly_income: '',
    
    // Academic
    is_second_courser: false,
    second_courser_degree_program: '',
    second_courser_level: '',
    is_working_student: false,
    employer_name: '',
    employer_address: '',
    
    // Transferee
    is_transferee: false,
    previous_schools: [],
    previously_applied: false,
    previous_application_year: '',
    was_accepted: false,
    did_attend: false,
    attendance_year: '',
    
    // Additional
    is_indigenous_people: false,
    indigenous_tribe: '',
    has_disability: false,
    disability_type: '',
    is_solo_parent_dependent: false,
    is_special_needs: false,
    special_needs_details: '',
    
    status: 'draft',
  })

  // Load existing profile or check for draft
  useEffect(() => {
    const loadProfile = async () => {
      if (profile && mode !== "create") {
        // Editing existing profile
        setFormData({
          ...profile,
          department_id: profile.department_id?.toString() || '',
          course_id: profile.course_id?.toString() || '',
          date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : '',
          insurance_beneficiary_dob: profile.insurance_beneficiary_dob ? new Date(profile.insurance_beneficiary_dob).toISOString().split('T')[0] : '',
        })
        setCurrentProfileId(profile.id)
      } else if (mode === "create" && currentUser?.id) {
        // Check if user already has a draft profile
        try {
          const response = await apiClient.getProfileByUserId(currentUser.id)
          if (response.success && response.data && response.data.status === 'draft') {
            // Load existing draft
            const existingProfile = response.data
            setFormData({
              ...existingProfile,
              department_id: existingProfile.department_id?.toString() || '',
              course_id: existingProfile.course_id?.toString() || '',
              date_of_birth: existingProfile.date_of_birth ? new Date(existingProfile.date_of_birth).toISOString().split('T')[0] : '',
              insurance_beneficiary_dob: existingProfile.insurance_beneficiary_dob ? new Date(existingProfile.insurance_beneficiary_dob).toISOString().split('T')[0] : '',
            })
            setCurrentProfileId(existingProfile.id)
            setLastSaved(new Date())
            toast.info('Loaded your draft profile. Continue editing!')
          }
        } catch (error) {
          console.log('No existing draft found, starting fresh')
        }
      }
    }
    
    loadProfile()
  }, [profile, mode, currentUser])

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await apiClient.getDepartments({ per_page: 100, status: 'active' })
        setDepartments(response.data || [])
      } catch (error) {
        console.error('Failed to fetch departments:', error)
        toast.error('Failed to load departments')
      }
    }
    fetchDepartments()
  }, [])

  // Fetch courses when department changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!formData.department_id) {
        setCourses([])
        return
      }
      
      try {
        setLoadingCourses(true)
        const response = await apiClient.getCourses({ 
          department_id: formData.department_id,
          status: 'active',
          per_page: 100
        })
        setCourses(response.data || [])
      } catch (error) {
        console.error('Failed to fetch courses:', error)
        toast.error('Failed to load courses')
        setCourses([])
      } finally {
        setLoadingCourses(false)
      }
    }
    fetchCourses()
  }, [formData.department_id])

  // Auto-save function
  const autoSave = async () => {
    if (isViewMode) return
    
    try {
      setAutoSaving(true)
      
      const dataToSubmit = {
        ...formData,
        status: 'draft',
      }

      let response
      if (currentProfileId) {
        // Update existing draft
        response = await apiClient.updateProfile(currentProfileId, dataToSubmit)
      } else {
        // Create new draft
        response = await apiClient.createProfile(dataToSubmit)
        if (response.success && response.data) {
          setCurrentProfileId(response.data.id)
        }
      }

      if (response.success) {
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error('Auto-save error:', error)
    } finally {
      setAutoSaving(false)
    }
  }

  // Auto-save effect with debouncing (3 seconds after last change)
  useEffect(() => {
    if (isViewMode) return
    
    const timer = setTimeout(() => {
      // Only auto-save if user has filled in at least name fields
      if (formData.given_name || formData.family_name) {
        autoSave()
      }
    }, 3000) // 3 seconds debounce

    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (name, value) => {
    // If department changes, reset course selection
    if (name === 'department_id') {
      setFormData(prev => ({ ...prev, [name]: value, course_id: '', course: '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (submitForReview = false) => {
    try {
      setLoading(true)

      const dataToSubmit = {
        ...formData,
        status: submitForReview ? 'submitted' : 'draft',
      }

      let response
      if (currentProfileId) {
        // Update existing profile (whether it was from edit mode or auto-created)
        response = await apiClient.updateProfile(currentProfileId, dataToSubmit)
      } else {
        // Create new profile
        response = await apiClient.createProfile(dataToSubmit)
        if (response.success && response.data) {
          setCurrentProfileId(response.data.id)
        }
      }

      if (response.success) {
        setLastSaved(new Date())
        toast.success(submitForReview ? 'Profile submitted successfully' : 'Profile saved successfully')
        if (onSuccess) onSuccess()
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error(error.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const isViewMode = mode === "view"

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="personal"><User className="h-4 w-4 mr-1" />Personal</TabsTrigger>
          <TabsTrigger value="address"><MapPin className="h-4 w-4 mr-1" />Address</TabsTrigger>
          <TabsTrigger value="education"><GraduationCap className="h-4 w-4 mr-1" />Education</TabsTrigger>
          <TabsTrigger value="parents"><Users className="h-4 w-4 mr-1" />Parents</TabsTrigger>
          <TabsTrigger value="guardian"><Shield className="h-4 w-4 mr-1" />Guardian</TabsTrigger>
          <TabsTrigger value="spouse"><Heart className="h-4 w-4 mr-1" />Spouse</TabsTrigger>
          <TabsTrigger value="academic"><Briefcase className="h-4 w-4 mr-1" />Academic</TabsTrigger>
          <TabsTrigger value="additional"><Info className="h-4 w-4 mr-1" />Additional</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFORMATION TAB */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Basic personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Department and Course Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department_id">Department *</Label>
                  <Select 
                    value={formData.department_id}
                    onValueChange={(value) => handleInputChange('department_id', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name} ({dept.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course_id">Course *</Label>
                  <Select 
                    value={formData.course_id}
                    onValueChange={(value) => {
                      const selectedCourse = courses.find(c => c.id.toString() === value)
                      handleInputChange('course_id', value)
                      if (selectedCourse) {
                        handleInputChange('course', selectedCourse.name)
                      }
                    }}
                    disabled={isViewMode || !formData.department_id || loadingCourses}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        !formData.department_id 
                          ? "Select department first" 
                          : loadingCourses 
                            ? "Loading courses..." 
                            : "Select a course"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.length === 0 && formData.department_id && !loadingCourses ? (
                        <div className="p-2 text-sm text-gray-500">No courses available</div>
                      ) : (
                        courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.code ? `${course.code} - ${course.name}` : course.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classified_as">Classified As *</Label>
                  <Select 
                    value={formData.classified_as}
                    onValueChange={(value) => handleInputChange('classified_as', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONTINUING">Continuing</SelectItem>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="TRANSFEREE">Transferee</SelectItem>
                      <SelectItem value="SECOND_COURSER">Second Courser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="family_name">Family Name *</Label>
                  <Input
                    id="family_name"
                    value={formData.family_name}
                    onChange={(e) => handleInputChange('family_name', e.target.value.toUpperCase())}
                    placeholder="SABAYDAY"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="given_name">Given Name *</Label>
                  <Input
                    id="given_name"
                    value={formData.given_name}
                    onChange={(e) => handleInputChange('given_name', e.target.value.toUpperCase())}
                    placeholder="KENT ADRIAN"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middle_name">Middle Name</Label>
                  <Input
                    id="middle_name"
                    value={formData.middle_name}
                    onChange={(e) => handleInputChange('middle_name', e.target.value.toUpperCase())}
                    placeholder="PALACIO"
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Gender, Blood Type, DOB */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select 
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood_type">Blood Type</Label>
                  <Select 
                    value={formData.blood_type}
                    onValueChange={(value) => handleInputChange('blood_type', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth (mm/dd/yyyy) *</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Height, Place of Birth, Civil Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (in feet/inches)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="5'6"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place_of_birth">Place of Birth *</Label>
                  <Input
                    id="place_of_birth"
                    value={formData.place_of_birth}
                    onChange={(e) => handleInputChange('place_of_birth', e.target.value)}
                    placeholder="Butuan City"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civil_status">Civil Status</Label>
                  <Select 
                    value={formData.civil_status}
                    onValueChange={(value) => handleInputChange('civil_status', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                      <SelectItem value="Separated">Separated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Religion, Citizenship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input
                    id="religion"
                    value={formData.religion}
                    onChange={(e) => handleInputChange('religion', e.target.value)}
                    placeholder="Roman Catholic"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="citizenship">Citizenship</Label>
                  <Input
                    id="citizenship"
                    value={formData.citizenship}
                    onChange={(e) => handleInputChange('citizenship', e.target.value)}
                    placeholder="Filipino"
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone Number</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    placeholder="09633460917"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_mobile">Mobile Number (To receive SMS)</Label>
                  <Input
                    id="contact_mobile"
                    value={formData.contact_mobile}
                    onChange={(e) => handleInputChange('contact_mobile', e.target.value)}
                    placeholder="+639633460917"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Languages Spoken */}
              <div className="space-y-2">
                <Label>Language Spoken</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lang_english"
                      checked={formData.language_english}
                      onCheckedChange={(checked) => handleInputChange('language_english', checked)}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="lang_english" className="font-normal cursor-pointer">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lang_filipino"
                      checked={formData.language_filipino}
                      onCheckedChange={(checked) => handleInputChange('language_filipino', checked)}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="lang_filipino" className="font-normal cursor-pointer">Filipino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lang_cebuano"
                      checked={formData.language_cebuano}
                      onCheckedChange={(checked) => handleInputChange('language_cebuano', checked)}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="lang_cebuano" className="font-normal cursor-pointer">Cebuano</Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <Label htmlFor="lang_others" className="whitespace-nowrap">Others:</Label>
                    <Input
                      id="lang_others"
                      value={formData.language_others}
                      onChange={(e) => handleInputChange('language_others', e.target.value)}
                      placeholder="Specify other languages"
                      disabled={isViewMode}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ADDRESS TAB */}
        <TabsContent value="address" className="space-y-4">
          {/* Current Address */}
          <Card>
            <CardHeader>
              <CardTitle>Current Address</CardTitle>
              <CardDescription>Where you currently reside</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_house_street">House# / Street Name & Barangay</Label>
                  <Input
                    id="current_house_street"
                    value={formData.current_house_street}
                    onChange={(e) => handleInputChange('current_house_street', e.target.value)}
                    placeholder="4th street Pareja Subdivision"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_barangay">Barangay</Label>
                  <Input
                    id="current_barangay"
                    value={formData.current_barangay}
                    onChange={(e) => handleInputChange('current_barangay', e.target.value)}
                    placeholder="Barangay Bayanihan"
                    disabled={isViewMode}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_region">Region</Label>
                  <Input
                    id="current_region"
                    value={formData.current_region}
                    onChange={(e) => handleInputChange('current_region', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_province">Province</Label>
                  <Input
                    id="current_province"
                    value={formData.current_province}
                    onChange={(e) => handleInputChange('current_province', e.target.value)}
                    placeholder="Agusan del Norte"
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_municipality">Municipality</Label>
                  <Input
                    id="current_municipality"
                    value={formData.current_municipality}
                    onChange={(e) => handleInputChange('current_municipality', e.target.value)}
                    placeholder="Butuan City"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_zip_code">Zip Code</Label>
                  <Input
                    id="current_zip_code"
                    value={formData.current_zip_code}
                    onChange={(e) => handleInputChange('current_zip_code', e.target.value)}
                    placeholder="8600"
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permanent Address */}
          <Card>
            <CardHeader>
              <CardTitle>Permanent Address</CardTitle>
              <CardDescription>Your permanent/home address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permanent_house_street">House# / Street Name & Barangay</Label>
                  <Input
                    id="permanent_house_street"
                    value={formData.permanent_house_street}
                    onChange={(e) => handleInputChange('permanent_house_street', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_barangay">Barangay</Label>
                  <Input
                    id="permanent_barangay"
                    value={formData.permanent_barangay}
                    onChange={(e) => handleInputChange('permanent_barangay', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permanent_region">Region</Label>
                  <Input
                    id="permanent_region"
                    value={formData.permanent_region}
                    onChange={(e) => handleInputChange('permanent_region', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_province">Province</Label>
                  <Input
                    id="permanent_province"
                    value={formData.permanent_province}
                    onChange={(e) => handleInputChange('permanent_province', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permanent_municipality">Municipality</Label>
                  <Input
                    id="permanent_municipality"
                    value={formData.permanent_municipality}
                    onChange={(e) => handleInputChange('permanent_municipality', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permanent_zip_code">Zip Code</Label>
                  <Input
                    id="permanent_zip_code"
                    value={formData.permanent_zip_code}
                    onChange={(e) => handleInputChange('permanent_zip_code', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EDUCATION TAB */}
        <TabsContent value="education" className="space-y-4">
          {/* Elementary School */}
          <Card>
            <CardHeader>
              <CardTitle>Elementary School</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="elementary_school_name">Name of School</Label>
                  <Input
                    id="elementary_school_name"
                    value={formData.elementary_school_name}
                    onChange={(e) => handleInputChange('elementary_school_name', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="elementary_school_address">Address</Label>
                  <Input
                    id="elementary_school_address"
                    value={formData.elementary_school_address}
                    onChange={(e) => handleInputChange('elementary_school_address', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="elementary_year_graduated">Year Graduated</Label>
                  <Input
                    id="elementary_year_graduated"
                    value={formData.elementary_year_graduated}
                    onChange={(e) => handleInputChange('elementary_year_graduated', e.target.value)}
                    placeholder="2011-2017"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="elementary_school_type">Type of School</Label>
                  <Select 
                    value={formData.elementary_school_type}
                    onValueChange={(value) => handleInputChange('elementary_school_type', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Junior High School */}
          <Card>
            <CardHeader>
              <CardTitle>Junior High School</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jhs_school_name">Name of School</Label>
                  <Input
                    id="jhs_school_name"
                    value={formData.jhs_school_name}
                    onChange={(e) => handleInputChange('jhs_school_name', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jhs_school_address">Address</Label>
                  <Input
                    id="jhs_school_address"
                    value={formData.jhs_school_address}
                    onChange={(e) => handleInputChange('jhs_school_address', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jhs_year_graduated">Year Graduated</Label>
                  <Input
                    id="jhs_year_graduated"
                    value={formData.jhs_year_graduated}
                    onChange={(e) => handleInputChange('jhs_year_graduated', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jhs_school_type">Type of School</Label>
                  <Select 
                    value={formData.jhs_school_type}
                    onValueChange={(value) => handleInputChange('jhs_school_type', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Senior High School */}
          <Card>
            <CardHeader>
              <CardTitle>Senior High School</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shs_school_name">Name of School</Label>
                  <Input
                    id="shs_school_name"
                    value={formData.shs_school_name}
                    onChange={(e) => handleInputChange('shs_school_name', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shs_school_address">Address</Label>
                  <Input
                    id="shs_school_address"
                    value={formData.shs_school_address}
                    onChange={(e) => handleInputChange('shs_school_address', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shs_year_graduated">Year Graduated</Label>
                  <Input
                    id="shs_year_graduated"
                    value={formData.shs_year_graduated}
                    onChange={(e) => handleInputChange('shs_year_graduated', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shs_school_type">Type of School</Label>
                  <Select 
                    value={formData.shs_school_type}
                    onValueChange={(value) => handleInputChange('shs_school_type', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* College */}
          <Card>
            <CardHeader>
              <CardTitle>College / Master's Degree</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college_school_name">Name of School</Label>
                  <Input
                    id="college_school_name"
                    value={formData.college_school_name}
                    onChange={(e) => handleInputChange('college_school_name', e.target.value)}
                    placeholder="Do not use acronym"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college_school_address">Address</Label>
                  <Input
                    id="college_school_address"
                    value={formData.college_school_address}
                    onChange={(e) => handleInputChange('college_school_address', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college_year_graduated">Year Graduated</Label>
                  <Input
                    id="college_year_graduated"
                    value={formData.college_year_graduated}
                    onChange={(e) => handleInputChange('college_year_graduated', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college_school_type">Type of School</Label>
                  <Select 
                    value={formData.college_school_type}
                    onValueChange={(value) => handleInputChange('college_school_type', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PARENTS TAB */}
        <TabsContent value="parents" className="space-y-4">
          {/* Mother Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Mother's Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother_maiden_name">Maiden Name</Label>
                  <Input
                    id="mother_maiden_name"
                    value={formData.mother_maiden_name}
                    onChange={(e) => handleInputChange('mother_maiden_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother_first_name">First Name</Label>
                  <Input
                    id="mother_first_name"
                    value={formData.mother_first_name}
                    onChange={(e) => handleInputChange('mother_first_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother_middle_name">Middle Name</Label>
                  <Input
                    id="mother_middle_name"
                    value={formData.mother_middle_name}
                    onChange={(e) => handleInputChange('mother_middle_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother_occupation">Occupation</Label>
                <Input
                  id="mother_occupation"
                  value={formData.mother_occupation}
                  onChange={(e) => handleInputChange('mother_occupation', e.target.value.toUpperCase())}
                  disabled={isViewMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Father Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Father's Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="father_family_name">Family Name</Label>
                  <Input
                    id="father_family_name"
                    value={formData.father_family_name}
                    onChange={(e) => handleInputChange('father_family_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father_given_name">Given Name</Label>
                  <Input
                    id="father_given_name"
                    value={formData.father_given_name}
                    onChange={(e) => handleInputChange('father_given_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father_middle_name">Middle Name</Label>
                  <Input
                    id="father_middle_name"
                    value={formData.father_middle_name}
                    onChange={(e) => handleInputChange('father_middle_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="father_occupation">Occupation</Label>
                <Input
                  id="father_occupation"
                  value={formData.father_occupation}
                  onChange={(e) => handleInputChange('father_occupation', e.target.value.toUpperCase())}
                  disabled={isViewMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Siblings */}
          <Card>
            <CardHeader>
              <CardTitle>Siblings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number_of_brothers">Number of Brothers</Label>
                  <Input
                    id="number_of_brothers"
                    type="number"
                    min="0"
                    value={formData.number_of_brothers}
                    onChange={(e) => handleInputChange('number_of_brothers', parseInt(e.target.value) || 0)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number_of_sisters">Number of Sisters</Label>
                  <Input
                    id="number_of_sisters"
                    type="number"
                    min="0"
                    value={formData.number_of_sisters}
                    onChange={(e) => handleInputChange('number_of_sisters', parseInt(e.target.value) || 0)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Home Address */}
          <Card>
            <CardHeader>
              <CardTitle>Parent Home Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="home_address">Home Address: No. & Street</Label>
                  <Input
                    id="home_address"
                    value={formData.home_address}
                    onChange={(e) => handleInputChange('home_address', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_zip_code">Zip Code</Label>
                  <Input
                    id="home_zip_code"
                    value={formData.home_zip_code}
                    onChange={(e) => handleInputChange('home_zip_code', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="home_municipality">Town / City</Label>
                  <Input
                    id="home_municipality"
                    value={formData.home_municipality}
                    onChange={(e) => handleInputChange('home_municipality', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_province">Province</Label>
                  <Input
                    id="home_province"
                    value={formData.home_province}
                    onChange={(e) => handleInputChange('home_province', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="home_phone">Phone</Label>
                  <Input
                    id="home_phone"
                    value={formData.home_phone}
                    onChange={(e) => handleInputChange('home_phone', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_mobile">Mobile # (To receive SMS Broadcast)</Label>
                  <Input
                    id="home_mobile"
                    value={formData.home_mobile}
                    onChange={(e) => handleInputChange('home_mobile', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Support */}
          <Card>
            <CardHeader>
              <CardTitle>For Insurance Purposes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Who supports or sponsors studies? (not any scholarship grant)</Label>
                <Select 
                  value={formData.financial_support}
                  onValueChange={(value) => handleInputChange('financial_support', value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sponsor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="GrandFather">GrandFather</SelectItem>
                    <SelectItem value="GrandMother">GrandMother</SelectItem>
                    <SelectItem value="Uncle">Uncle</SelectItem>
                    <SelectItem value="Aunt">Aunt</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Monthly Income of Parents/Sponsor</Label>
                <Select 
                  value={formData.monthly_income}
                  onValueChange={(value) => handleInputChange('monthly_income', value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000_below">10,000 and below</SelectItem>
                    <SelectItem value="10001_20000">10,001 - 20,000</SelectItem>
                    <SelectItem value="20001_above">20,001 and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance_beneficiary_family_name">Insurance Beneficiary / Breadwinner - Family Name</Label>
                  <Input
                    id="insurance_beneficiary_family_name"
                    value={formData.insurance_beneficiary_family_name}
                    onChange={(e) => handleInputChange('insurance_beneficiary_family_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance_beneficiary_given_name">Given Name</Label>
                  <Input
                    id="insurance_beneficiary_given_name"
                    value={formData.insurance_beneficiary_given_name}
                    onChange={(e) => handleInputChange('insurance_beneficiary_given_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance_beneficiary_middle_name">Middle Name</Label>
                  <Input
                    id="insurance_beneficiary_middle_name"
                    value={formData.insurance_beneficiary_middle_name}
                    onChange={(e) => handleInputChange('insurance_beneficiary_middle_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance_beneficiary_dob">Date of Birth of Insurance Beneficiary / Breadwinner</Label>
                <Input
                  id="insurance_beneficiary_dob"
                  type="date"
                  value={formData.insurance_beneficiary_dob}
                  onChange={(e) => handleInputChange('insurance_beneficiary_dob', e.target.value)}
                  disabled={isViewMode}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GUARDIAN TAB */}
        <TabsContent value="guardian" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
              <CardDescription>Person to contact in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardian_family_name">Family Name</Label>
                  <Input
                    id="guardian_family_name"
                    value={formData.guardian_family_name}
                    onChange={(e) => handleInputChange('guardian_family_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian_given_name">Given Name</Label>
                  <Input
                    id="guardian_given_name"
                    value={formData.guardian_given_name}
                    onChange={(e) => handleInputChange('guardian_given_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian_middle_name">Middle Name</Label>
                  <Input
                    id="guardian_middle_name"
                    value={formData.guardian_middle_name}
                    onChange={(e) => handleInputChange('guardian_middle_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardian_relationship">Relationship</Label>
                  <Select 
                    value={formData.guardian_relationship}
                    onValueChange={(value) => handleInputChange('guardian_relationship', value)}
                    disabled={isViewMode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Mother">Mother</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Grandparent">Grandparent</SelectItem>
                      <SelectItem value="Uncle">Uncle</SelectItem>
                      <SelectItem value="Aunt">Aunt</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.guardian_relationship === 'Others' && (
                  <div className="space-y-2">
                    <Label htmlFor="guardian_relationship_others">Please Specify</Label>
                    <Input
                      id="guardian_relationship_others"
                      value={formData.guardian_relationship_others}
                      onChange={(e) => handleInputChange('guardian_relationship_others', e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardian_address">Home Address</Label>
                <Input
                  id="guardian_address"
                  value={formData.guardian_address}
                  onChange={(e) => handleInputChange('guardian_address', e.target.value)}
                  disabled={isViewMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardian_phone">Phone</Label>
                  <Input
                    id="guardian_phone"
                    value={formData.guardian_phone}
                    onChange={(e) => handleInputChange('guardian_phone', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian_mobile">Mobile #</Label>
                  <Input
                    id="guardian_mobile"
                    value={formData.guardian_mobile}
                    onChange={(e) => handleInputChange('guardian_mobile', e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SPOUSE TAB */}
        <TabsContent value="spouse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spouse Information</CardTitle>
              <CardDescription>If applicable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spouse_family_name">Family Name</Label>
                  <Input
                    id="spouse_family_name"
                    value={formData.spouse_family_name}
                    onChange={(e) => handleInputChange('spouse_family_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouse_given_name">Given Name</Label>
                  <Input
                    id="spouse_given_name"
                    value={formData.spouse_given_name}
                    onChange={(e) => handleInputChange('spouse_given_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouse_middle_name">Middle Name</Label>
                  <Input
                    id="spouse_middle_name"
                    value={formData.spouse_middle_name}
                    onChange={(e) => handleInputChange('spouse_middle_name', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number_of_children">Number of Children</Label>
                  <Input
                    id="number_of_children"
                    type="number"
                    min="0"
                    value={formData.number_of_children}
                    onChange={(e) => handleInputChange('number_of_children', parseInt(e.target.value) || 0)}
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spouse_occupation">Occupation</Label>
                  <Input
                    id="spouse_occupation"
                    value={formData.spouse_occupation}
                    onChange={(e) => handleInputChange('spouse_occupation', e.target.value.toUpperCase())}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACADEMIC TAB */}
        <TabsContent value="academic" className="space-y-4">
          {/* Second Courser */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_second_courser"
                  checked={formData.is_second_courser}
                  onCheckedChange={(checked) => handleInputChange('is_second_courser', checked)}
                  disabled={isViewMode}
                />
                <Label htmlFor="is_second_courser" className="font-normal cursor-pointer">
                  FOR SECOND COURSER ONLY (Graduate in 2 or 4/5 year course)
                </Label>
              </div>

              {formData.is_second_courser && (
                <div className="space-y-4 pl-6 border-l-2">
                  <div className="space-y-2">
                    <Label htmlFor="second_courser_degree_program">What degree program do you intend to pursue?</Label>
                    <Input
                      id="second_courser_degree_program"
                      value={formData.second_courser_degree_program}
                      onChange={(e) => handleInputChange('second_courser_degree_program', e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select 
                      value={formData.second_courser_level}
                      onValueChange={(value) => handleInputChange('second_courser_level', value)}
                      disabled={isViewMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Baccalaureate">Baccalaureate</SelectItem>
                        <SelectItem value="Law">Law</SelectItem>
                        <SelectItem value="Voc-Tech">Voc-Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Working Student */}
          <Card>
            <CardHeader>
              <CardTitle>Working Student</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_working_student"
                  checked={formData.is_working_student}
                  onCheckedChange={(checked) => handleInputChange('is_working_student', checked)}
                  disabled={isViewMode}
                />
                <Label htmlFor="is_working_student" className="font-normal cursor-pointer">
                  Are you a working student?
                </Label>
              </div>

              {formData.is_working_student && (
                <div className="space-y-4 pl-6 border-l-2">
                  <div className="space-y-2">
                    <Label htmlFor="employer_name">Name and Address of Most Recent Employer</Label>
                    <Input
                      id="employer_name"
                      value={formData.employer_name}
                      onChange={(e) => handleInputChange('employer_name', e.target.value)}
                      placeholder="Employer name"
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer_address">Employer Address</Label>
                    <Input
                      id="employer_address"
                      value={formData.employer_address}
                      onChange={(e) => handleInputChange('employer_address', e.target.value)}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transferee */}
          <Card>
            <CardHeader>
              <CardTitle>For Transferee Only</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_transferee"
                  checked={formData.is_transferee}
                  onCheckedChange={(checked) => handleInputChange('is_transferee', checked)}
                  disabled={isViewMode}
                />
                <Label htmlFor="is_transferee" className="font-normal cursor-pointer">
                  Are you a transferee?
                </Label>
              </div>

              {formData.is_transferee && (
                <div className="space-y-4 pl-6 border-l-2">
                  <p className="text-sm text-gray-600">
                    Please list all universities and/or colleges you have attended and year attended. 
                    Failure to disclose previous attendance at another institution could result in academic dismissal.
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="previously_applied"
                      checked={formData.previously_applied}
                      onCheckedChange={(checked) => handleInputChange('previously_applied', checked)}
                      disabled={isViewMode}
                    />
                    <Label htmlFor="previously_applied" className="font-normal cursor-pointer">
                      Have you ever applied to FATHER SATURNINO URIOS UNIVERSITY before?
                    </Label>
                  </div>

                  {formData.previously_applied && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="previous_application_year">Year of Application</Label>
                        <Input
                          id="previous_application_year"
                          value={formData.previous_application_year}
                          onChange={(e) => handleInputChange('previous_application_year', e.target.value)}
                          disabled={isViewMode}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="was_accepted"
                          checked={formData.was_accepted}
                          onCheckedChange={(checked) => handleInputChange('was_accepted', checked)}
                          disabled={isViewMode}
                        />
                        <Label htmlFor="was_accepted" className="font-normal cursor-pointer">
                          Were you accepted?
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="did_attend"
                          checked={formData.did_attend}
                          onCheckedChange={(checked) => handleInputChange('did_attend', checked)}
                          disabled={isViewMode}
                        />
                        <Label htmlFor="did_attend" className="font-normal cursor-pointer">
                          Did you attend?
                        </Label>
                      </div>

                      {formData.did_attend && (
                        <div className="space-y-2">
                          <Label htmlFor="attendance_year">Year Attended</Label>
                          <Input
                            id="attendance_year"
                            value={formData.attendance_year}
                            onChange={(e) => handleInputChange('attendance_year', e.target.value)}
                            disabled={isViewMode}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ADDITIONAL INFORMATION TAB */}
        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Indigenous People */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_indigenous_people"
                    checked={formData.is_indigenous_people}
                    onCheckedChange={(checked) => handleInputChange('is_indigenous_people', checked)}
                    disabled={isViewMode}
                  />
                  <Label htmlFor="is_indigenous_people" className="font-normal cursor-pointer">
                    Are you a member of an Indigenous Peoples?
                  </Label>
                </div>
                {formData.is_indigenous_people && (
                  <div className="pl-6">
                    <Label htmlFor="indigenous_tribe">Please choose which tribe applies to you</Label>
                    <Input
                      id="indigenous_tribe"
                      value={formData.indigenous_tribe}
                      onChange={(e) => handleInputChange('indigenous_tribe', e.target.value)}
                      placeholder="Tribe name"
                      disabled={isViewMode}
                    />
                  </div>
                )}
              </div>

              {/* Disability */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="has_disability"
                    checked={formData.has_disability}
                    onCheckedChange={(checked) => handleInputChange('has_disability', checked)}
                    disabled={isViewMode}
                  />
                  <Label htmlFor="has_disability" className="font-normal cursor-pointer">
                    Do you have a disability?
                  </Label>
                </div>
                {formData.has_disability && (
                  <div className="pl-6">
                    <Label htmlFor="disability_type">Please choose which applies to you</Label>
                    <Input
                      id="disability_type"
                      value={formData.disability_type}
                      onChange={(e) => handleInputChange('disability_type', e.target.value)}
                      placeholder="Disability type"
                      disabled={isViewMode}
                    />
                  </div>
                )}
              </div>

              {/* Solo Parent */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is_solo_parent_dependent"
                  checked={formData.is_solo_parent_dependent}
                  onCheckedChange={(checked) => handleInputChange('is_solo_parent_dependent', checked)}
                  disabled={isViewMode}
                />
                <Label htmlFor="is_solo_parent_dependent" className="font-normal cursor-pointer">
                  Are you dependent on a single/solo parent?
                </Label>
              </div>

              {/* Special Needs */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_special_needs"
                    checked={formData.is_special_needs}
                    onCheckedChange={(checked) => handleInputChange('is_special_needs', checked)}
                    disabled={isViewMode}
                  />
                  <Label htmlFor="is_special_needs" className="font-normal cursor-pointer">
                    Are you a student with special needs?
                  </Label>
                </div>
                {formData.is_special_needs && (
                  <div className="pl-6">
                    <Label htmlFor="special_needs_details">Please Specify</Label>
                    <Textarea
                      id="special_needs_details"
                      value={formData.special_needs_details}
                      onChange={(e) => handleInputChange('special_needs_details', e.target.value)}
                      placeholder="Describe your special needs"
                      disabled={isViewMode}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Auto-save Status */}
      {!isViewMode && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            {autoSaving && (
              <span className="flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Saving...
              </span>
            )}
            {!autoSaving && lastSaved && (
              <span className="flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Last saved {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
            {!autoSaving && !lastSaved && (
              <span className="text-gray-400">
                Changes will auto-save
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isViewMode && (
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onCancel} disabled={loading || autoSaving}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit(false)} disabled={loading || autoSaving}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit(true)} disabled={loading || autoSaving}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Send className="h-4 w-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      )}
    </div>
  )
}

