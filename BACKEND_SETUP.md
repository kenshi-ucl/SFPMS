# SFPMS Backend Setup Guide

## Prerequisites
- PHP 8.2+
- Composer
- MySQL 5.7+ or 8.0+
- Node.js (for frontend)

## Backend Setup Steps

### 1. Navigate to Backend Directory
```bash
cd sfpms-backend
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Create Database
Create a MySQL database named `sfpms_db`:
```sql
CREATE DATABASE sfpms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Environment Configuration
The `.env` file is already configured. Update the database password if needed:
```env
DB_PASSWORD=your_mysql_password
```

### 5. Generate JWT Secret
```bash
php artisan jwt:secret
```

### 6. Run Migrations
```bash
php artisan migrate
```

### 7. Seed Database
```bash
php artisan db:seed
```

### 8. Start Development Server
```bash
php artisan serve
```

The backend will be available at `http://localhost:8000`

## Frontend Setup Steps

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Test Accounts

After seeding the database, you can use these accounts:

### Admin Account
- Email: `admin@sfpms.edu`
- Password: `admin123`
- Access: Full system administration

### Faculty Account
- Email: `john.smith@sfpms.edu`
- Password: `faculty123`
- Access: Faculty portal and student management

### Student Account
- Email: `alice.williams@student.sfpms.edu`
- Password: `student123`
- Access: Student portal and profile management

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### User Management (Admin only)
- `GET /api/users` - Get all users with filters
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `PATCH /api/users/{id}/toggle-status` - Toggle user status
- `GET /api/users/role/{role}` - Get users by role

## Testing the Integration

1. Start both backend (`php artisan serve`) and frontend (`npm run dev`)
2. Navigate to `http://localhost:3000`
3. Try logging in with any of the test accounts
4. Test user management features (admin account only)
5. Test role-based access control

## Troubleshooting

### CORS Issues
If you encounter CORS issues, verify:
- Backend CORS configuration in `config/cors.php`
- Frontend API URL in `.env.local`

### Database Connection
If database connection fails:
- Check MySQL is running
- Verify database credentials in `.env`
- Ensure database `sfpms_db` exists

### JWT Issues
If JWT authentication fails:
- Run `php artisan jwt:secret` to generate JWT secret
- Clear cache: `php artisan config:clear`
- Check JWT configuration in `config/jwt.php`
