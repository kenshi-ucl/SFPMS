<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPublicResource extends JsonResource
{
    /**
     * Transform the resource into a limited public array.
     * This resource shows only safe public information.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'employee_id' => $this->when($this->role !== 'student', $this->employee_id),
            'student_id' => $this->when($this->role === 'student', $this->student_id),
            'department_id' => $this->department_id,
            'joined_at' => $this->joined_at?->format('Y-m-d H:i:s'),
        ];
    }
}
