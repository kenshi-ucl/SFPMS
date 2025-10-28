<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        // Course Information
        'department_id',
        'course_id',
        'course',
        'classified_as',
        
        // Personal Information
        'family_name',
        'given_name',
        'middle_name',
        'gender',
        'blood_type',
        'date_of_birth',
        'height',
        'place_of_birth',
        'civil_status',
        
        // Current Address
        'current_house_street',
        'current_barangay',
        'current_region',
        'current_province',
        'current_municipality',
        'current_zip_code',
        
        // Permanent Address
        'permanent_house_street',
        'permanent_barangay',
        'permanent_region',
        'permanent_province',
        'permanent_municipality',
        'permanent_zip_code',
        
        // Additional Personal Info
        'religion',
        'citizenship',
        'contact_phone',
        'contact_mobile',
        'email',
        
        // Languages
        'language_english',
        'language_filipino',
        'language_cebuano',
        'language_others',
        
        // Elementary School
        'elementary_school_name',
        'elementary_school_address',
        'elementary_year_graduated',
        'elementary_school_type',
        
        // Junior High School
        'jhs_school_name',
        'jhs_school_address',
        'jhs_year_graduated',
        'jhs_school_type',
        
        // Senior High School
        'shs_school_name',
        'shs_school_address',
        'shs_year_graduated',
        'shs_school_type',
        
        // College
        'college_school_name',
        'college_school_address',
        'college_year_graduated',
        'college_school_type',
        
        // Mother
        'mother_maiden_name',
        'mother_first_name',
        'mother_middle_name',
        'mother_occupation',
        
        // Father
        'father_family_name',
        'father_given_name',
        'father_middle_name',
        'father_occupation',
        
        // Siblings
        'number_of_brothers',
        'number_of_sisters',
        
        // Home Address
        'home_address',
        'home_zip_code',
        'home_municipality',
        'home_province',
        'home_phone',
        'home_mobile',
        
        // Guardian
        'guardian_family_name',
        'guardian_given_name',
        'guardian_middle_name',
        'guardian_relationship',
        'guardian_relationship_others',
        'guardian_address',
        'guardian_phone',
        'guardian_mobile',
        
        // Spouse
        'spouse_family_name',
        'spouse_given_name',
        'spouse_middle_name',
        'number_of_children',
        'spouse_occupation',
        
        // Insurance Beneficiary
        'insurance_beneficiary_family_name',
        'insurance_beneficiary_given_name',
        'insurance_beneficiary_middle_name',
        'insurance_beneficiary_dob',
        
        // Financial
        'financial_support',
        'monthly_income',
        
        // Academic Profile
        'is_second_courser',
        'second_courser_degree_program',
        'second_courser_level',
        
        // Working Student
        'is_working_student',
        'employer_name',
        'employer_address',
        
        // Transferee
        'is_transferee',
        'previous_schools',
        'previously_applied',
        'previous_application_year',
        'was_accepted',
        'did_attend',
        'attendance_year',
        
        // Additional Information
        'is_indigenous_people',
        'indigenous_tribe',
        'has_disability',
        'disability_type',
        'is_solo_parent_dependent',
        'is_special_needs',
        'special_needs_details',
        
        // Profile Picture
        'profile_picture',
        'reuse_old_id_picture',
        
        // Status
        'status',
        'submitted_at',
        'approved_at',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'insurance_beneficiary_dob' => 'date',
        'language_english' => 'boolean',
        'language_filipino' => 'boolean',
        'language_cebuano' => 'boolean',
        'is_second_courser' => 'boolean',
        'is_working_student' => 'boolean',
        'is_transferee' => 'boolean',
        'previously_applied' => 'boolean',
        'was_accepted' => 'boolean',
        'did_attend' => 'boolean',
        'is_indigenous_people' => 'boolean',
        'has_disability' => 'boolean',
        'is_solo_parent_dependent' => 'boolean',
        'is_special_needs' => 'boolean',
        'reuse_old_id_picture' => 'boolean',
        'previous_schools' => 'array',
        'submitted_at' => 'datetime',
        'approved_at' => 'datetime',
        'number_of_brothers' => 'integer',
        'number_of_sisters' => 'integer',
        'number_of_children' => 'integer',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the department for this profile.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the course for this profile.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get full name
     */
    public function getFullNameAttribute()
    {
        return trim("{$this->given_name} {$this->middle_name} {$this->family_name}");
    }

    /**
     * Scope for submitted profiles
     */
    public function scopeSubmitted($query)
    {
        return $query->where('status', 'submitted');
    }

    /**
     * Scope for approved profiles
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for draft profiles
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}

