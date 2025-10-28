# Department and Course Dropdown Implementation

## Summary
Successfully implemented department and course dropdowns in the student profile creation form. The course dropdown dynamically updates based on the selected department.

## Changes Made

### 1. Database Migration
**File:** `database/migrations/2025_10_28_103324_add_department_and_course_ids_to_student_profiles_table.php`
- Added `department_id` foreign key column to `student_profiles` table
- Added `course_id` foreign key column to `student_profiles` table
- Both columns are nullable and set to null on delete
- Migration has been run successfully

### 2. Student Profile Model
**File:** `app/Models/StudentProfile.php`
- Added `department_id` and `course_id` to the `$fillable` array
- Added `department()` relationship method (belongsTo Department)
- Added `course()` relationship method (belongsTo Course)

### 3. Profile Controller
**File:** `app/Http/Controllers/ProfileController.php`
- Updated all queries to eager load `department` and `course` relationships
- Modified `index()`, `show()`, `getByUserId()` methods to include relationships
- Updated `store()` and `update()` methods to:
  - Include `department_id` and `course_id` in validation rules
  - Load relationships in responses

### 4. Profile Form Component
**File:** `resources/js/components/profile-form.jsx`

#### New State Variables:
- `departments`: Array to store all active departments
- `courses`: Array to store courses filtered by selected department
- `loadingCourses`: Boolean to show loading state while fetching courses

#### New Form Data Fields:
- `department_id`: Selected department ID
- `course_id`: Selected course ID
- `course`: Course name (kept for backward compatibility)

#### New useEffect Hooks:
1. **Fetch Departments on Mount:**
   - Fetches all active departments when component loads
   - Stores in `departments` state

2. **Fetch Courses When Department Changes:**
   - Automatically fetches courses when `department_id` changes
   - Filters courses by the selected department
   - Shows loading state while fetching
   - Clears courses if no department is selected

#### Updated handleInputChange:
- Resets `course_id` and `course` when department changes
- Ensures course selection is cleared when switching departments

how to fucck this fucking niggas all of you browns and whites you nuggas 
#### Updated UI:
- **Department Dropdown:**
  - Shows department name and code (e.g., "Computer Science (CS)")
  - Required field
  - Lists all active departments

- **Course Dropdown:**
  - Disabled until department is selected
  - Shows "Select department first" placeholder when no department is selected
  - Shows "Loading courses..." while fetching
  - Shows "No courses available" when department has no courses
  - Displays course code and name (e.g., "BSIT - Bachelor of Science in IT")
  - Automatically updates `course` field with selected course name

- **Classified As Field:**
  - Moved to a separate row below department/course selection
  - Still functions the same (Continuing, New, Transferee, Second Courser)

## Features

### Dynamic Course Filtering
- When user selects a department, only courses from that department are shown
- Automatic loading with visual feedback
- Prevents invalid course selection

### Data Integrity
- Foreign key constraints ensure valid department and course references
- Validation rules in controller prevent invalid data
- Relationships properly loaded in all API responses

### User Experience
- Clear labels and placeholders
- Disabled states prevent premature selection
- Loading states provide feedback during data fetch
- Seamless integration with existing form

## API Endpoints Used

1. **Get Departments:**
   ```
   GET /api/departments?per_page=100&status=active
   ```

2. **Get Courses by Department:**
   ```
   GET /api/courses?department_id={id}&status=active&per_page=100
   ```

## Testing Recommendations

1. **Create New Profile:**
   - Select a department
   - Verify courses load for that department
   - Select a course
   - Fill other required fields
   - Submit form
   - Verify profile is created with correct department_id and course_id

2. **Edit Existing Profile:**
   - Open profile with existing department/course
   - Verify dropdowns show correct selections
   - Change department
   - Verify course dropdown resets and loads new courses
   - Save changes

3. **Edge Cases:**
   - Department with no courses (should show "No courses available")
   - Changing department after selecting course (course should reset)
   - Form validation (required fields)

## Backward Compatibility

- The `course` field (text) is still maintained for backward compatibility
- It's automatically populated when a course is selected from the dropdown
- Existing profiles without department_id/course_id will still work

## Files Modified

1. `database/migrations/2025_10_28_103324_add_department_and_course_ids_to_student_profiles_table.php` (New)
2. `app/Models/StudentProfile.php`
3. `app/Http/Controllers/ProfileController.php`
4. `resources/js/components/profile-form.jsx`

## Next Steps

If needed, you can also:
1. Add department/course filters to the student profiles list page
2. Show department and course information in profile display views
3. Add department-based statistics to the dashboard
4. Implement course capacity tracking per department

---

**Implementation Date:** October 28, 2025
**Status:** ✅ Complete and Compiled Successfully

