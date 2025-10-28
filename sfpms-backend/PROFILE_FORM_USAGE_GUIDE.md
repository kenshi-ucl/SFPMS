# Student Profile Form - Department & Course Selection Guide

## Overview
The student profile creation form now includes dynamic department and course selection dropdowns that work together to ensure students select valid course options.

## How It Works

### Step-by-Step Process

#### 1. Open Create New Profile Form
Navigate to the student profile creation page and you'll see the updated Personal Information tab.

#### 2. Select Department
- **Field:** Department *
- **Location:** First field in the Course Selection section
- **Options:** Shows all active departments from the database
- **Format:** "Department Name (CODE)"
  - Example: "College of Computer Studies (CCS)"
  - Example: "College of Engineering (COE)"
  - Example: "College of Business Administration (CBA)"

#### 3. Select Course
- **Field:** Course *
- **Location:** Second field in the Course Selection section
- **Behavior:**
  - ❌ **Disabled** until you select a department
  - 🔄 **Shows "Loading courses..."** while fetching courses
  - ✅ **Shows available courses** for the selected department
  - ⚠️ **Shows "No courses available"** if department has no courses

- **Options:** Only shows courses that belong to the selected department
- **Format:** "CODE - Course Name"
  - Example: "BSIT - Bachelor of Science in Information Technology"
  - Example: "BSCS - Bachelor of Science in Computer Science"
  - Example: "BSCE - Bachelor of Science in Civil Engineering"

#### 4. Change Department (Optional)
- If you change the department after selecting a course:
  - ✅ The course selection automatically **resets**
  - 🔄 New courses for the selected department are **loaded automatically**
  - 📝 You must select a course again from the new list

#### 5. Select Classification
- **Field:** Classified As *
- **Location:** Below Department and Course fields
- **Options:**
  - Continuing
  - New
  - Transferee
  - Second Courser

## Visual Layout

```
┌────────────────────────────────────────────────────────────────┐
│  Personal Information                                          │
│  Basic personal details and contact information               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Department *              Course *                            │
│  ┌──────────────────┐     ┌──────────────────────────┐        │
│  │ Select a dept ▼  │     │ Select department first  │        │
│  └──────────────────┘     └──────────────────────────┘        │
│                                                                │
│  Classified As *                                               │
│  ┌──────────────────┐                                         │
│  │ Continuing    ▼  │                                         │
│  └──────────────────┘                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**After selecting Department:**

```
┌────────────────────────────────────────────────────────────────┐
│  Personal Information                                          │
│  Basic personal details and contact information               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Department *              Course *                            │
│  ┌──────────────────┐     ┌──────────────────────────┐        │
│  │ CCS (Computer) ▼ │     │ Select a course       ▼  │        │
│  └──────────────────┘     └──────────────────────────┘        │
│                                                                │
│  Classified As *                                               │
│  ┌──────────────────┐                                         │
│  │ Continuing    ▼  │                                         │
│  └──────────────────┘                                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**With Course Dropdown Open:**

```
┌────────────────────────────────────────────────────────────────┐
│  Department *              Course *                            │
│  ┌──────────────────┐     ┌──────────────────────────┐        │
│  │ CCS (Computer) ▼ │     │ BSIT - BS in IT       ▼  │        │
│  └──────────────────┘     │──────────────────────────│        │
│                           │ BSIT - BS in IT          │        │
│                           │ BSCS - BS in CS          │        │
│                           │ BSIS - BS in IS          │        │
│                           │ ACT - Associate in CT    │        │
│                           └──────────────────────────┘        │
└────────────────────────────────────────────────────────────────┘
```

## Sample Departments & Courses

### College of Computer Studies (CCS)
- BSIT - Bachelor of Science in Information Technology
- BSCS - Bachelor of Science in Computer Science
- BSIS - Bachelor of Science in Information Systems
- ACT - Associate in Computer Technology

### College of Engineering (COE)
- BSCE - Bachelor of Science in Civil Engineering
- BSEE - Bachelor of Science in Electrical Engineering
- BSME - Bachelor of Science in Mechanical Engineering
- BSECE - Bachelor of Science in Electronics and Communications Engineering

### College of Business Administration (CBA)
- BSBA-MM - BS in Business Administration Major in Marketing Management
- BSBA-FM - BS in Business Administration Major in Financial Management
- BSBA-HRDM - BS in Business Administration Major in Human Resource Development
- BSA - Bachelor of Science in Accountancy

### College of Education (COED)
- BEED - Bachelor of Elementary Education
- BSED-ENGLISH - Bachelor of Secondary Education Major in English
- BSED-MATH - Bachelor of Secondary Education Major in Mathematics
- BSED-SCIENCE - Bachelor of Secondary Education Major in Science

## Features & Benefits

### 🎯 Accurate Course Selection
- Students can only select courses that exist in their chosen department
- Eliminates errors from manual course entry
- Ensures data consistency across the system

### 🔄 Dynamic Updates
- Courses automatically update when department changes
- No page refresh needed
- Real-time feedback on available options

### ✅ Data Validation
- Both department and course are required fields
- Backend validation ensures data integrity
- Foreign key constraints prevent invalid data

### 📊 Better Reporting
- Department-based filtering now possible
- Course enrollment tracking per department
- Statistical analysis by department and course

## Important Notes

1. **Required Fields:** Both Department and Course are required to submit the profile

2. **Data Persistence:** 
   - Selected department and course are saved with the profile
   - Can be edited later if needed
   - Historical data is preserved

3. **Active Status:**
   - Only active departments and courses are shown
   - Inactive items won't appear in dropdowns

4. **Backend Compatibility:**
   - The old `course` text field is maintained for backward compatibility
   - Automatically populated when you select a course
   - Existing profiles will continue to work

## Troubleshooting

### "No courses available" message
- The selected department doesn't have any active courses
- Contact administrator to add courses to the department
- Try selecting a different department

### Course dropdown stays disabled
- Make sure you've selected a department first
- Check that departments are loading (dropdown should have options)
- Refresh the page if the issue persists

### Courses from wrong department showing
- This shouldn't happen - if it does, please report as a bug
- Clear the form and start over
- Make sure you're using the latest version

## For Administrators

To manage departments and courses:
1. Navigate to **Departments** menu (Admin only)
2. Add/Edit departments with proper codes
3. Navigate to **Courses** menu (Admin only)
4. Add/Edit courses and assign to departments
5. Ensure both departments and courses are set to "Active" status

---

**Last Updated:** October 28, 2025
**Version:** 1.0.0

