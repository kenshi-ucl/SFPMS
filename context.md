# Student and Faculty Profile Management System (SFPMS)
## Complete System Requirements and Specifications

---

## 1. SYSTEM OVERVIEW

### 1.1 Purpose
The Student and Faculty Profile Management System (SFPMS) is a comprehensive web-based application designed to centralize and streamline the management of personal, academic, and professional profiles for students and faculty members within educational institutions (schools, colleges, and universities).

### 1.2 Scope
- **Multi-institutional Support**: Scalable for single campus or multi-campus institutions
- **Role-based Access Control**: Administrator, Faculty, and Student roles
- **Complete Profile Lifecycle Management**: From creation to archival
- **Reporting and Analytics**: Comprehensive data visualization and report generation
- **Audit Trail**: Complete activity logging for compliance and security

### 1.3 Design Theme
- **Primary Colors**: Purple (#7C3AED, #9333EA) and White (#FFFFFF)
- **Minimalist Design**: Clean interfaces with focus on functionality
- **Typography**: Sans-serif fonts for clarity
- **Responsive Layout**: Mobile-first approach with fluid grid system

---

## 2. USER ROLES AND PERMISSIONS

### 2.1 Administrator (Super Admin)
**Full System Access**
- Create, read, update, delete, and archive all profiles
- Manage system settings and configurations
- Generate all types of reports
- View system-wide analytics
- Manage user accounts and permissions
- Access audit logs
- Perform batch operations
- System backup and restore capabilities

### 2.2 Department Administrator
**Department-Level Access**
- Manage faculty and students within their department
- Generate department-specific reports
- View department analytics
- Limited system settings access

### 2.3 Faculty
**Limited Access**
- View own profile (full access)
- Edit certain fields in own profile
- View student list (read-only)
- Generate class lists
- View department colleagues (limited info)

### 2.4 Student
**Restricted Access**
- View and edit own profile (limited fields)
- View course information
- View faculty directory (public information only)
- Download own transcripts/reports

---

## 3. SYSTEM MODULES - DETAILED SPECIFICATIONS

### 3.1 AUTHENTICATION MODULE

#### 3.1.1 Login System
- **Multi-factor Authentication (MFA)**
  - Email/SMS verification
  - Authenticator app support
  - Biometric authentication (where supported)
- **Single Sign-On (SSO) Integration**
  - LDAP/Active Directory
  - OAuth 2.0 (Google, Microsoft)
  - SAML 2.0
- **Password Management**
  - Strong password enforcement (min 12 characters, mixed case, numbers, symbols)
  - Password expiry (90 days)
  - Password history (last 5 passwords)
  - Forgot password with email reset
  - Account lockout after 5 failed attempts

#### 3.1.2 Session Management
- Session timeout (30 minutes idle)
- Concurrent session limitation
- Session activity logging
- Remember me functionality (optional, 30 days)

---

### 3.2 DASHBOARD MODULE

#### 3.2.1 Overview Statistics
**Real-time Metrics Display**
- Total active students (with trend indicator)
- Total active faculty (with trend indicator)
- Total departments
- Total courses offered
- Current academic year/semester
- System alerts and notifications

#### 3.2.2 Interactive Charts and Visualizations
**Student Analytics**
- Pie chart: Students distribution by course
- Bar chart: Students per department
- Line graph: Enrollment trends (5-year history)
- Donut chart: Students by year level
- Heat map: Geographic distribution
- Gender distribution chart
- Age demographic pyramid

**Faculty Analytics**
- Bar chart: Faculty per department
- Pie chart: Faculty by designation (Professor, Associate, Assistant, Lecturer)
- Stack chart: Faculty qualifications (PhD, Masters, Bachelors)
- Timeline: Faculty tenure distribution
- Workload distribution chart

#### 3.2.3 Quick Actions Panel
- Add new student (modal)
- Add new faculty (modal)
- Generate quick report
- System announcements
- Recent activities feed
- Pending approvals widget

#### 3.2.4 Performance Indicators
- System health status
- Database usage
- Active users online
- Response time metrics

---

### 3.3 FACULTY MODULE

#### 3.3.1 Faculty Profile Fields
**Personal Information**
- Employee ID (auto-generated, unique)
- Title (Mr./Ms./Dr./Prof.)
- First Name, Middle Name, Last Name
- Date of Birth
- Gender
- Nationality
- Marital Status
- Blood Group
- Religion (optional)
- Profile Photo (max 2MB, JPG/PNG)

**Contact Information**
- Personal Email
- Official Email
- Mobile Number (primary)
- Alternative Phone
- Current Address
- Permanent Address
- Emergency Contact (Name, Relationship, Phone)

**Professional Information**
- Department
- Designation
- Faculty Type (Regular/Visiting/Contract)
- Date of Joining
- Employment Status (Active/On Leave/Sabbatical)
- Specialization Areas (multiple)
- Office Location
- Office Hours

**Academic Qualifications**
- Degree Type
- Field of Study
- Institution
- Year of Completion
- Grade/CGPA
- Certificates (uploadable PDFs)

**Experience**
- Previous Institutions
- Position Held
- Duration (From-To)
- Key Responsibilities

**Research & Publications**
- Research Papers (Title, Journal, Year, DOI)
- Books Authored
- Patents
- Conference Presentations
- Research Grants
- Awards and Recognitions

**Teaching Information**
- Courses Currently Teaching
- Past Courses Taught
- Teaching Load (hours/week)
- Student Feedback Rating

**Documents**
- Resume/CV upload
- Appointment Letter
- ID Proof
- Address Proof
- Educational Certificates
- Experience Certificates

#### 3.3.2 Faculty Management Features
**CRUD Operations**
- Add new faculty (multi-step form with validation)
- Edit faculty (with change history)
- View faculty (detailed profile view)
- Archive faculty (soft delete with reason)
- Restore archived faculty
- Bulk import via Excel/CSV
- Bulk update operations

**Search and Filter**
- Advanced search with multiple parameters
- Filter by department (multi-select)
- Filter by designation
- Filter by joining date range
- Filter by employment status
- Filter by specialization
- Sort by name, joining date, department

**Additional Features**
- Print faculty profile
- Export to PDF/Excel
- Email faculty directly
- Generate faculty ID card
- Faculty attendance tracking
- Leave management integration
- Performance evaluation tracking

---

### 3.4 STUDENTS MODULE

#### 3.4.1 Student Profile Fields
**Personal Information**
- Student ID (auto-generated, unique)
- Registration Number
- First Name, Middle Name, Last Name
- Date of Birth
- Gender
- Nationality
- Blood Group
- Religion (optional)
- Category (General/OBC/SC/ST/Others)
- Student Photo (max 2MB, JPG/PNG)

**Contact Information**
- Personal Email
- Student Email (institutional)
- Mobile Number
- Alternative Phone
- Current Address (Hostel/Local)
- Permanent Address

**Parent/Guardian Information**
- Father's Name, Occupation, Contact
- Mother's Name, Occupation, Contact
- Guardian Name (if applicable)
- Guardian Relationship, Contact
- Parent's Email
- Parent's Annual Income (optional)
- Emergency Contact Details

**Academic Information**
- Course/Program Enrolled
- Department
- Current Semester/Year
- Section/Division
- Roll Number
- Admission Date
- Admission Type (Regular/Lateral/Transfer)
- Student Status (Active/Inactive/Graduated/Dropped)
- Expected Graduation Date

**Previous Education**
- School/College Name
- Board/University
- Year of Passing
- Percentage/CGPA
- Entrance Exam Details (if applicable)

**Academic Performance**
- Current CGPA
- Semester-wise Results
- Attendance Percentage
- Backlogs/Arrears
- Achievements
- Extracurricular Activities

**Documents**
- Birth Certificate
- Admission Letter
- Previous Mark Sheets
- Transfer Certificate
- Migration Certificate
- Character Certificate
- Caste Certificate (if applicable)
- Income Certificate
- Aadhar Card/ID Proof

#### 3.4.2 Student Management Features
**CRUD Operations**
- Add new student (wizard-style form)
- Edit student (with approval workflow)
- View student (comprehensive profile)
- Archive student (with reason and date)
- Bulk registration
- Batch promotion
- Alumni conversion

**Search and Filter**
- Search by name, ID, registration number
- Filter by course (hierarchical)
- Filter by department
- Filter by semester/year
- Filter by admission year
- Filter by status
- Filter by fee payment status
- Advanced search with combination filters

**Additional Features**
- Generate student ID card
- Print admission form
- Fee management integration
- Library card generation
- Hostel allocation tracking
- Transport management
- Disciplinary record tracking
- Placement record management

---

### 3.5 REPORTS MODULE

#### 3.5.1 Student Reports
**Academic Reports**
- Course-wise student list
- Department-wise distribution
- Semester-wise enrollment
- Academic performance analysis
- Attendance reports
- Top performers list
- Students at risk (low CGPA/attendance)
- Graduation statistics

**Administrative Reports**
- Admission reports (yearly/monthly)
- Fee collection status
- Scholarship recipients
- Hostel occupancy
- Transport utilization
- Alumni database

**Custom Reports**
- Dynamic report builder
- Configurable columns
- Multiple export formats (PDF, Excel, CSV)
- Scheduled report generation
- Email distribution lists

#### 3.5.2 Faculty Reports
**Department Reports**
- Department-wise faculty list
- Faculty qualification summary
- Faculty workload analysis
- Leave statistics
- Research output summary
- Faculty-student ratio

**Performance Reports**
- Teaching evaluation scores
- Research publications
- Conference participation
- Training attended/conducted
- Awards and achievements

**Administrative Reports**
- Recruitment analysis
- Retirement forecast
- Salary structure report
- Faculty attendance
- Professional development tracking

#### 3.5.3 Comparative Reports
- Year-over-year comparisons
- Department benchmarking
- Trend analysis
- Predictive analytics
- KPI dashboards

---

### 3.6 SYSTEM SETTINGS MODULE

#### 3.6.1 Course Management
**Course Information**
- Course Code (unique)
- Course Name
- Course Type (UG/PG/Diploma/Certificate)
- Duration (in years/semesters)
- Total Credits
- Department Association
- Course Coordinator
- Intake Capacity
- Eligibility Criteria
- Course Description
- Course Outcomes
- Fee Structure

**Course Operations**
- Add new course
- Edit course details
- Archive/deactivate course
- Course curriculum management
- Subject mapping
- Credit distribution
- Prerequisite configuration

#### 3.6.2 Department Management
**Department Information**
- Department Code (unique)
- Department Name
- Department Type (Academic/Administrative)
- Establishment Date
- Head of Department
- Contact Information
- Department Vision/Mission
- Total Faculty Strength
- Total Student Capacity
- Infrastructure Details

**Department Operations**
- Create department
- Update department info
- Assign department head
- Department hierarchy
- Budget allocation
- Resource management

#### 3.6.3 Academic Year Management
**Academic Configuration**
- Academic Year (e.g., 2024-2025)
- Start Date
- End Date
- Total Working Days
- Semester/Term Division
- Holiday Calendar
- Examination Schedule
- Academic Events
- Important Deadlines

**Semester/Term Settings**
- Semester Name
- Duration
- Course Registration Period
- Add/Drop Period
- Examination Period
- Result Declaration Date
- Vacation Period

#### 3.6.4 System Configuration
**General Settings**
- Institution Name
- Institution Logo
- Address and Contact
- Registration/Affiliation Details
- Academic Policies
- Email Configuration
- SMS Gateway Settings
- Storage Settings

**Security Settings**
- Password Policies
- Session Management
- IP Whitelisting
- Access Control Lists
- Backup Configuration
- Audit Log Settings
- Data Retention Policies

**Notification Settings**
- Email Templates
- SMS Templates
- Push Notification Config
- Alert Triggers
- Reminder Settings
- Broadcast Messages

---

### 3.7 MY PROFILE MODULE

#### 3.7.1 Profile Management
**View Profile**
- Complete profile information display
- Profile completeness indicator
- Last updated timestamp
- Profile views counter

**Edit Profile**
- Personal information (restricted fields)
- Contact details
- Password change
- Security questions
- Notification preferences
- Theme preferences
- Language settings

**Profile Features**
- Upload/change profile picture
- Download profile as PDF
- Print profile
- Activity history
- Login history
- Password change history

#### 3.7.2 Account Settings
- Two-factor authentication setup
- Connected devices management
- API access tokens
- Email notifications toggle
- SMS notifications toggle
- Privacy settings
- Data export request

---

## 4. TECHNICAL SPECIFICATIONS

### 4.1 Architecture
- **Frontend**: Responsive SPA (Single Page Application)
- **Backend**: RESTful API architecture
- **Database**: Relational database with proper indexing
- **Caching**: Redis/Memcached for performance
- **File Storage**: Cloud storage for documents
- **Search**: Elasticsearch for advanced searching

### 4.2 Security Requirements
- SSL/TLS encryption
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- DDoS protection
- Regular security audits
- GDPR compliance
- Data encryption at rest

### 4.3 Performance Requirements
- Page load time < 3 seconds
- API response time < 500ms
- Support 10,000+ concurrent users
- 99.9% uptime SLA
- Auto-scaling capabilities
- Load balancing
- Database optimization
- CDN for static assets

### 4.4 Integration Capabilities
- Learning Management System (LMS)
- Enterprise Resource Planning (ERP)
- Human Resource Management System (HRMS)
- Library Management System
- Fee Management System
- Attendance Management System
- Email Services (SMTP)
- SMS Gateway
- Payment Gateways
- Biometric Systems

---

## 5. USER INTERFACE SPECIFICATIONS

### 5.1 Design Principles
- **Minimalist Approach**: Clean, clutter-free interfaces
- **Purple-White Theme**: 
  - Primary Purple: #7C3AED
  - Secondary Purple: #9333EA
  - Accent Purple: #A855F7
  - Background White: #FFFFFF
  - Text Gray: #374151
- **Typography**: Inter or Segoe UI font family
- **Spacing**: Consistent 8px grid system
- **Icons**: Lucide or Heroicons library
- **Animations**: Subtle, purposeful transitions

### 5.2 Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Touch-friendly interfaces
- Progressive Web App (PWA) capabilities

### 5.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- High contrast mode
- Font size adjustment
- Multi-language support

---

## 6. DATA MANAGEMENT

### 6.1 Data Backup
- Automated daily backups
- Weekly full backups
- Monthly archival
- Off-site backup storage
- Point-in-time recovery
- Disaster recovery plan

### 6.2 Data Retention
- Active data: Real-time access
- Archived data: 7 years
- Audit logs: 3 years
- Deleted data: 30-day recovery window
- Compliance with educational regulations

### 6.3 Data Privacy
- Personal data encryption
- Access control
- Data anonymization for reports
- Right to erasure (GDPR)
- Data portability
- Consent management

---

## 7. NOTIFICATION SYSTEM

### 7.1 Notification Types
- **System Notifications**
  - Login alerts
  - Password changes
  - Profile updates
  - System maintenance

- **Academic Notifications**
  - Course registration
  - Exam schedules
  - Result declarations
  - Attendance warnings

- **Administrative Notifications**
  - Fee reminders
  - Document submissions
  - Event announcements
  - Policy updates

### 7.2 Delivery Channels
- In-app notifications
- Email notifications
- SMS notifications
- Push notifications (mobile app)
- WhatsApp integration (optional)

---

## 8. REPORTING AND ANALYTICS

### 8.1 Dashboard Analytics
- Real-time data visualization
- Customizable widgets
- Drill-down capabilities
- Export functionality
- Scheduled reports
- Comparative analysis

### 8.2 Advanced Analytics
- Predictive analytics for student performance
- Faculty workload optimization
- Resource utilization analysis
- Trend identification
- Anomaly detection
- Custom KPI tracking

---

## 9. MOBILE APPLICATION

### 9.1 Features
- Native iOS and Android apps
- Offline capability
- Push notifications
- Biometric authentication
- Document scanner
- QR code for attendance

### 9.2 Functionality
- View profiles
- Update basic information
- Check notifications
- View reports
- Access documents
- Emergency contacts

---

## 10. IMPLEMENTATION PHASES

### Phase 1: Foundation (Months 1-2)
- System architecture setup
- Database design
- Authentication module
- Basic CRUD operations

### Phase 2: Core Modules (Months 3-4)
- Dashboard development
- Faculty module
- Student module
- Basic reporting

### Phase 3: Advanced Features (Months 5-6)
- Advanced search and filters
- System settings
- Notification system
- Integration APIs

### Phase 4: Enhancement (Months 7-8)
- Mobile application
- Advanced analytics
- Performance optimization
- Security hardening

### Phase 5: Deployment (Month 9)
- User acceptance testing
- Training and documentation
- Pilot deployment
- Full rollout

---

## 11. TRAINING AND SUPPORT

### 11.1 Training Program
- Administrator training (16 hours)
- Faculty training (8 hours)
- Student orientation (4 hours)
- Online tutorials
- Video guides
- User manuals

### 11.2 Support Structure
- 24/7 helpdesk
- Ticketing system
- Knowledge base
- FAQs
- Community forum
- Regular updates

---

## 12. SUCCESS METRICS

### 12.1 Key Performance Indicators
- User adoption rate > 95%
- System uptime > 99.9%
- User satisfaction score > 4.5/5
- Report generation time < 30 seconds
- Data accuracy > 99.99%
- Support ticket resolution < 24 hours

### 12.2 ROI Metrics
- Reduced administrative time by 60%
- Improved data accuracy
- Enhanced decision-making
- Better resource utilization
- Increased stakeholder satisfaction

---

## 13. COMPLIANCE AND STANDARDS

### 13.1 Educational Standards
- National education board requirements
- University grant commission guidelines
- Accreditation body standards
- International education standards

### 13.2 Technical Standards
- ISO 27001 (Information Security)
- ISO 9001 (Quality Management)
- OWASP security guidelines
- REST API standards
- W3C web standards

### 13.3 Legal Compliance
- GDPR (General Data Protection Regulation)
- FERPA (Family Educational Rights and Privacy Act)
- Local data protection laws
- Accessibility laws
- Copyright regulations

---

## 14. FUTURE ENHANCEMENTS

### 14.1 AI Integration
- Automated profile verification
- Intelligent report generation
- Predictive analytics
- Chatbot support
- Anomaly detection
- Natural language processing

### 14.2 Blockchain Integration
- Credential verification
- Tamper-proof records
- Digital certificates
- Decentralized storage

### 14.3 IoT Integration
- Smart ID cards
- Automated attendance
- Campus navigation
- Resource tracking

---

## 15. CONCLUSION

The Student and Faculty Profile Management System represents a comprehensive solution for educational institutions to effectively manage their human resources. With its robust feature set, scalable architecture, and user-friendly interface, the system will significantly improve administrative efficiency, data accuracy, and stakeholder satisfaction. The purple and white minimalist design ensures a professional and modern appearance while maintaining excellent usability across all user roles.

erDiagram
    %% Core User and Authentication Entities
    USERS {
        int user_id PK
        string username UK
        string password_hash
        string email UK
        enum user_type "admin|dept_admin|faculty|student"
        enum status "active|inactive|suspended"
        datetime last_login
        int failed_login_attempts
        datetime account_locked_until
        boolean is_deleted
        datetime created_at
        datetime updated_at
        int created_by FK
        int updated_by FK
    }

    USER_SESSIONS {
        int session_id PK
        int user_id FK
        string session_token UK
        string ip_address
        string user_agent
        datetime login_time
        datetime last_activity
        datetime logout_time
        enum status "active|expired|terminated"
    }

    PASSWORD_HISTORY {
        int history_id PK
        int user_id FK
        string password_hash
        datetime changed_at
        string changed_by
    }

    MFA_SETTINGS {
        int mfa_id PK
        int user_id FK
        enum mfa_type "sms|email|authenticator|biometric"
        string secret_key
        string phone_number
        boolean is_enabled
        datetime enabled_at
    }

    %% Faculty Related Entities
    FACULTY {
        int faculty_id PK
        int user_id FK
        string employee_id UK
        enum title "Mr|Ms|Dr|Prof"
        string first_name
        string middle_name
        string last_name
        date date_of_birth
        enum gender "Male|Female|Other"
        string nationality
        enum marital_status "Single|Married|Divorced|Widowed"
        string blood_group
        string religion
        string profile_photo_url
        string personal_email
        string official_email UK
        string mobile_primary
        string mobile_alternate
        string current_address
        string permanent_address
        int department_id FK
        int designation_id FK
        enum faculty_type "Regular|Visiting|Contract"
        date joining_date
        enum employment_status "Active|On_Leave|Sabbatical|Resigned|Retired"
        string office_location
        string office_hours
        decimal teaching_load_hours
        decimal student_feedback_rating
        boolean is_archived
        datetime archived_at
        string archive_reason
        datetime created_at
        datetime updated_at
    }

    FACULTY_EMERGENCY_CONTACTS {
        int contact_id PK
        int faculty_id FK
        string contact_name
        string relationship
        string phone_number
        string email
        string address
        boolean is_primary
    }

    FACULTY_QUALIFICATIONS {
        int qualification_id PK
        int faculty_id FK
        enum degree_type "PhD|Masters|Bachelors|Diploma|Certificate"
        string field_of_study
        string institution
        int year_completion
        decimal grade_cgpa
        string certificate_url
        int display_order
    }

    FACULTY_EXPERIENCE {
        int experience_id PK
        int faculty_id FK
        string institution_name
        string position_held
        date from_date
        date to_date
        text key_responsibilities
        boolean is_current
    }

    FACULTY_SPECIALIZATIONS {
        int specialization_id PK
        int faculty_id FK
        string specialization_area
        string expertise_level
        int years_experience
    }

    FACULTY_RESEARCH {
        int research_id PK
        int faculty_id FK
        enum research_type "Paper|Book|Patent|Conference|Grant"
        string title
        string journal_conference
        int publication_year
        string doi_isbn
        string co_authors
        decimal grant_amount
        string funding_agency
        string document_url
    }

    FACULTY_AWARDS {
        int award_id PK
        int faculty_id FK
        string award_name
        string awarding_body
        date award_date
        string description
        string certificate_url
    }

    FACULTY_DOCUMENTS {
        int document_id PK
        int faculty_id FK
        enum document_type "Resume|Appointment|ID_Proof|Address_Proof|Education|Experience"
        string document_name
        string document_url
        date upload_date
        enum verification_status "Pending|Verified|Rejected"
        int verified_by FK
        datetime verified_at
    }

    %% Student Related Entities
    STUDENTS {
        int student_id PK
        int user_id FK
        string student_id_number UK
        string registration_number UK
        string first_name
        string middle_name
        string last_name
        date date_of_birth
        enum gender "Male|Female|Other"
        string nationality
        string blood_group
        string religion
        enum category "General|OBC|SC|ST|Others"
        string profile_photo_url
        string personal_email
        string student_email UK
        string mobile_primary
        string mobile_alternate
        enum address_type "Hostel|Local|PG"
        string current_address
        string permanent_address
        int course_id FK
        int department_id FK
        int current_semester
        string section_division
        string roll_number
        date admission_date
        enum admission_type "Regular|Lateral|Transfer"
        enum student_status "Active|Inactive|Graduated|Dropped|Suspended"
        date expected_graduation
        decimal current_cgpa
        decimal attendance_percentage
        int backlogs_count
        boolean is_archived
        datetime archived_at
        string archive_reason
        datetime created_at
        datetime updated_at
    }

    STUDENT_PARENTS {
        int parent_id PK
        int student_id FK
        string father_name
        string father_occupation
        string father_contact
        string mother_name
        string mother_occupation
        string mother_contact
        string guardian_name
        string guardian_relationship
        string guardian_contact
        string parent_email
        decimal annual_income
        string emergency_contact_name
        string emergency_contact_phone
    }

    STUDENT_EDUCATION {
        int education_id PK
        int student_id FK
        enum education_level "10th|12th|Diploma|UG|PG"
        string institution_name
        string board_university
        int year_passing
        decimal percentage_cgpa
        string marksheet_url
        string entrance_exam_name
        decimal entrance_score
        int entrance_rank
    }

    STUDENT_DOCUMENTS {
        int document_id PK
        int student_id FK
        enum document_type "Birth|Admission|Marksheet|Transfer|Migration|Character|Caste|Income|ID"
        string document_name
        string document_url
        date upload_date
        enum verification_status "Pending|Verified|Rejected"
        int verified_by FK
        datetime verified_at
    }

    STUDENT_ACHIEVEMENTS {
        int achievement_id PK
        int student_id FK
        string achievement_title
        enum achievement_type "Academic|Sports|Cultural|Technical|Other"
        string description
        date achievement_date
        string certificate_url
    }

    STUDENT_DISCIPLINARY {
        int record_id PK
        int student_id FK
        enum action_type "Warning|Suspension|Fine|Other"
        string incident_description
        date incident_date
        string action_taken
        int reported_by FK
        string resolution
        date resolution_date
    }

    %% Course and Department Entities
    DEPARTMENTS {
        int department_id PK
        string department_code UK
        string department_name
        enum department_type "Academic|Administrative"
        date establishment_date
        int head_faculty_id FK
        string contact_email
        string contact_phone
        text vision_statement
        text mission_statement
        int faculty_capacity
        int student_capacity
        text infrastructure_details
        decimal budget_allocated
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    COURSES {
        int course_id PK
        string course_code UK
        string course_name
        enum course_type "UG|PG|Diploma|Certificate"
        int duration_years
        int total_semesters
        int total_credits
        int department_id FK
        int coordinator_id FK
        int intake_capacity
        text eligibility_criteria
        text course_description
        text course_outcomes
        decimal fee_structure
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    COURSE_CURRICULUM {
        int curriculum_id PK
        int course_id FK
        int academic_year_id FK
        string subject_code
        string subject_name
        int semester
        int credits
        enum subject_type "Core|Elective|Lab|Project"
        int theory_hours
        int practical_hours
        text syllabus
        text prerequisites
    }

    FACULTY_COURSES {
        int assignment_id PK
        int faculty_id FK
        int course_id FK
        int curriculum_id FK
        int academic_year_id FK
        int semester
        enum role "Primary|Assistant|Lab"
        date assigned_from
        date assigned_to
        boolean is_current
    }

    STUDENT_COURSES {
        int enrollment_id PK
        int student_id FK
        int course_id FK
        int curriculum_id FK
        int academic_year_id FK
        int semester
        date enrollment_date
        enum enrollment_status "Enrolled|Completed|Dropped|Failed"
        decimal grade_obtained
        string grade_letter
        decimal attendance_percentage
    }

    %% Academic Year and Settings
    ACADEMIC_YEARS {
        int academic_year_id PK
        string academic_year UK
        date start_date
        date end_date
        int total_working_days
        boolean is_current
        datetime created_at
    }

    ACADEMIC_SEMESTERS {
        int semester_id PK
        int academic_year_id FK
        string semester_name
        int semester_number
        date start_date
        date end_date
        date registration_start
        date registration_end
        date add_drop_start
        date add_drop_end
        date exam_start
        date exam_end
        date result_date
        date vacation_start
        date vacation_end
    }

    ACADEMIC_CALENDAR {
        int calendar_id PK
        int academic_year_id FK
        date event_date
        string event_name
        enum event_type "Holiday|Exam|Event|Deadline|Other"
        string description
        boolean is_holiday
    }

    DESIGNATIONS {
        int designation_id PK
        string designation_name
        enum designation_level "Professor|Associate|Assistant|Lecturer|Other"
        int hierarchy_level
        boolean is_active
    }

    %% System Settings and Configuration
    SYSTEM_SETTINGS {
        int setting_id PK
        string setting_key UK
        text setting_value
        enum setting_type "General|Security|Email|SMS|Storage|Notification"
        string description
        datetime updated_at
        int updated_by FK
    }

    INSTITUTION_INFO {
        int institution_id PK
        string institution_name
        string registration_number
        string affiliation_number
        string logo_url
        string address
        string city
        string state
        string country
        string postal_code
        string contact_email
        string contact_phone
        string website
        text about
        text policies
    }

    %% Reports and Analytics
    GENERATED_REPORTS {
        int report_id PK
        string report_name
        enum report_type "Student|Faculty|Course|Department|Financial|Custom"
        json report_parameters
        string generated_by FK
        datetime generated_at
        string file_url
        enum format "PDF|Excel|CSV"
        int download_count
    }

    REPORT_SCHEDULES {
        int schedule_id PK
        string report_name
        enum report_type "Student|Faculty|Course|Department|Financial|Custom"
        json report_parameters
        enum frequency "Daily|Weekly|Monthly|Quarterly|Yearly"
        string cron_expression
        string email_recipients
        boolean is_active
        datetime last_run
        datetime next_run
    }

    %% Audit and Activity Logs
    AUDIT_LOGS {
        int log_id PK
        int user_id FK
        string action
        string entity_type
        int entity_id
        json old_values
        json new_values
        string ip_address
        string user_agent
        datetime created_at
    }

    ACTIVITY_LOGS {
        int activity_id PK
        int user_id FK
        string activity_type
        string activity_description
        string module
        datetime activity_time
        string ip_address
    }

    %% Notifications
    NOTIFICATIONS {
        int notification_id PK
        int user_id FK
        enum notification_type "System|Academic|Administrative"
        string title
        text message
        enum priority "Low|Medium|High|Urgent"
        boolean is_read
        datetime read_at
        datetime created_at
        datetime scheduled_for
    }

    NOTIFICATION_TEMPLATES {
        int template_id PK
        string template_name UK
        enum template_type "Email|SMS|Push|InApp"
        string subject
        text body_template
        json variables
        boolean is_active
    }

    %% Fee and Financial Management
    FEE_STRUCTURE {
        int fee_id PK
        int course_id FK
        int academic_year_id FK
        decimal tuition_fee
        decimal lab_fee
        decimal library_fee
        decimal sports_fee
        decimal other_fee
        decimal total_fee
        date due_date
    }

    FEE_PAYMENTS {
        int payment_id PK
        int student_id FK
        int fee_id FK
        decimal amount_paid
        date payment_date
        enum payment_method "Cash|Cheque|Online|DD|NEFT"
        string transaction_id
        string receipt_number
        enum status "Pending|Partial|Complete|Overdue"
    }

    SCHOLARSHIPS {
        int scholarship_id PK
        int student_id FK
        string scholarship_name
        decimal amount
        int academic_year_id FK
        enum status "Applied|Approved|Rejected|Disbursed"
        date application_date
        date approval_date
    }

    %% Library Management
    LIBRARY_CARDS {
        int card_id PK
        int user_id FK
        string card_number UK
        date issue_date
        date expiry_date
        enum status "Active|Suspended|Expired"
        int books_issued
        int max_books_allowed
    }

    %% Hostel Management
    HOSTEL_ALLOCATION {
        int allocation_id PK
        int student_id FK
        string hostel_name
        string room_number
        int bed_number
        date allocation_date
        date vacation_date
        enum status "Occupied|Vacant|Maintenance"
        decimal room_fee
    }

    %% Transport Management
    TRANSPORT_REGISTRATION {
        int registration_id PK
        int user_id FK
        string route_number
        string pickup_point
        string drop_point
        decimal fee_amount
        date valid_from
        date valid_to
        enum status "Active|Inactive|Suspended"
    }

    %% Attendance Management
    ATTENDANCE_RECORDS {
        int attendance_id PK
        int user_id FK
        enum user_type "Student|Faculty"
        date attendance_date
        enum status "Present|Absent|Late|Holiday|Leave"
        time check_in_time
        time check_out_time
        int marked_by FK
        datetime marked_at
    }

    LEAVE_REQUESTS {
        int leave_id PK
        int user_id FK
        enum leave_type "Casual|Medical|Emergency|Vacation|Other"
        date from_date
        date to_date
        int total_days
        text reason
        enum status "Pending|Approved|Rejected|Cancelled"
        int approved_by FK
        datetime approved_at
        text approval_remarks
    }

    %% Placement Management
    PLACEMENT_RECORDS {
        int placement_id PK
        int student_id FK
        string company_name
        string position
        decimal package_offered
        date placement_date
        enum placement_type "On_Campus|Off_Campus|Internship"
        enum status "Placed|Not_Placed|In_Process"
    }

    %% Alumni Management
    ALUMNI {
        int alumni_id PK
        int student_id FK
        int graduation_year
        string current_organization
        string current_position
        string current_location
        string linkedin_profile
        boolean is_active_member
        datetime converted_at
    }

    %% Define Relationships
    USERS ||--o| FACULTY : "has_profile"
    USERS ||--o| STUDENTS : "has_profile"
    USERS ||--o{ USER_SESSIONS : "has"
    USERS ||--o{ PASSWORD_HISTORY : "maintains"
    USERS ||--o{ MFA_SETTINGS : "configures"
    USERS ||--o{ AUDIT_LOGS : "generates"
    USERS ||--o{ ACTIVITY_LOGS : "performs"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ LIBRARY_CARDS : "owns"
    USERS ||--o{ TRANSPORT_REGISTRATION : "registers"
    USERS ||--o{ ATTENDANCE_RECORDS : "has"
    USERS ||--o{ LEAVE_REQUESTS : "requests"

    FACULTY ||--o{ FACULTY_EMERGENCY_CONTACTS : "has"
    FACULTY ||--o{ FACULTY_QUALIFICATIONS : "possesses"
    FACULTY ||--o{ FACULTY_EXPERIENCE : "gained"
    FACULTY ||--o{ FACULTY_SPECIALIZATIONS : "specializes_in"
    FACULTY ||--o{ FACULTY_RESEARCH : "publishes"
    FACULTY ||--o{ FACULTY_AWARDS : "receives"
    FACULTY ||--o{ FACULTY_DOCUMENTS : "submits"
    FACULTY ||--o{ FACULTY_COURSES : "teaches"
    FACULTY }o--|| DEPARTMENTS : "belongs_to"
    FACULTY }o--|| DESIGNATIONS : "holds"

    STUDENTS ||--|| STUDENT_PARENTS : "has"
    STUDENTS ||--o{ STUDENT_EDUCATION : "completed"
    STUDENTS ||--o{ STUDENT_DOCUMENTS : "submits"
    STUDENTS ||--o{ STUDENT_ACHIEVEMENTS : "earned"
    STUDENTS ||--o{ STUDENT_DISCIPLINARY : "has_records"
    STUDENTS ||--o{ STUDENT_COURSES : "enrolls_in"
    STUDENTS }o--|| COURSES : "pursues"
    STUDENTS }o--|| DEPARTMENTS : "belongs_to"
    STUDENTS ||--o{ FEE_PAYMENTS : "makes"
    STUDENTS ||--o{ SCHOLARSHIPS : "receives"
    STUDENTS ||--o{ HOSTEL_ALLOCATION : "allocated"
    STUDENTS ||--o{ PLACEMENT_RECORDS : "has"
    STUDENTS ||--o| ALUMNI : "becomes"

    DEPARTMENTS ||--o{ COURSES : "offers"
    DEPARTMENTS ||--o| FACULTY : "headed_by"

    COURSES ||--o{ COURSE_CURRICULUM : "contains"
    COURSES ||--o| FACULTY : "coordinated_by"
    COURSES ||--o{ FACULTY_COURSES : "taught_in"
    COURSES ||--o{ STUDENT_COURSES : "enrolled_by"
    COURSES ||--o{ FEE_STRUCTURE : "has"

    ACADEMIC_YEARS ||--o{ ACADEMIC_SEMESTERS : "divided_into"
    ACADEMIC_YEARS ||--o{ ACADEMIC_CALENDAR : "schedules"
    ACADEMIC_YEARS ||--o{ COURSE_CURRICULUM : "applies_to"
    ACADEMIC_YEARS ||--o{ FACULTY_COURSES : "during"
    ACADEMIC_YEARS ||--o{ STUDENT_COURSES : "during"
    ACADEMIC_YEARS ||--o{ FEE_STRUCTURE : "for"

    COURSE_CURRICULUM ||--o{ FACULTY_COURSES : "assigned"
    COURSE_CURRICULUM ||--o{ STUDENT_COURSES : "taken"

    FEE_STRUCTURE ||--o{ FEE_PAYMENTS : "paid_against"

    GENERATED_REPORTS }o--|| USERS : "generated_by"
    REPORT_SCHEDULES ||--o{ GENERATED_REPORTS : "produces"

    NOTIFICATION_TEMPLATES ||--o{ NOTIFICATIONS : "uses"