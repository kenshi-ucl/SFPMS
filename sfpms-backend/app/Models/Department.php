<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
        'head_of_department',
        'email',
        'phone',
        'location',
        'status',
    ];

    /**
     * Get the users for the department.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the faculty members for the department.
     */
    public function faculty()
    {
        return $this->hasMany(User::class)->where('role', 'faculty');
    }

    /**
     * Get all students for the department.
     */
    public function students()
    {
        return $this->hasMany(User::class)->where('role', User::ROLE_STUDENT);
    }

    /**
     * Get the courses offered by this department.
     */
    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Scope a query to only include active departments.
     */
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }
}
