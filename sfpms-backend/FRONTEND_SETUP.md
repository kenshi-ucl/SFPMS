# SFPMS Frontend Setup Guide (Laravel Mix Integration)

## Overview
The SFPMS frontend has been integrated into the Laravel backend using Laravel Mix. The frontend is built with React (JavaScript) and uses Tailwind CSS for styling.

## Directory Structure

```
sfpms-backend/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components (buttons, cards, etc.)
│   │   │   ├── app.jsx          # Main application component
│   │   │   ├── login-form.jsx   # Login component
│   │   │   ├── app-sidebar.jsx  # Sidebar navigation
│   │   │   ├── dashboard.jsx    # Dashboard component
│   │   │   ├── dashboard-header.jsx
│   │   │   └── *-management.jsx # Management components
│   │   ├── hooks/
│   │   │   ├── use-mobile.jsx   # Mobile detection hook
│   │   │   └── use-toast.js     # Toast notifications hook
│   │   ├── lib/
│   │   │   ├── api.js           # API client
│   │   │   ├── auth.js          # Authentication utilities
│   │   │   ├── auth-context.jsx # Auth context provider
│   │   │   ├── utils.js         # Utility functions
│   │   │   ├── rbac.js          # Role-based access control
│   │   │   ├── security.js      # Security utilities
│   │   │   ├── db.js            # Database utilities
│   │   │   └── types.js         # Type definitions (JSDoc)
│   │   ├── app.js               # Main entry point
│   │   └── bootstrap.js         # Bootstrap file
│   ├── css/
│   │   └── app.css              # Main CSS file with Tailwind
│   └── views/
│       ├── app.blade.php        # Main blade template
│       └── layouts/
│           └── app.blade.php    # Layout template
├── public/
│   ├── js/
│   │   └── app.js               # Compiled JavaScript
│   └── css/
│       └── app.css              # Compiled CSS
├── webpack.mix.js               # Laravel Mix configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── .babelrc                     # Babel configuration
└── package.json                 # NPM dependencies

```

## Installation Steps

### 1. Navigate to Backend Directory
```bash
cd sfpms-backend
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install NPM Dependencies
```bash
npm install
```

### 4. Environment Configuration
Ensure your `.env` file has the following configuration:

```env
APP_NAME=SFPMS
APP_URL=http://localhost:8000

# Mix Configuration
MIX_API_BASE_URL=http://localhost:8000/api

# Database Configuration
DB_CONNECTION=mysql
DB_DATABASE=sfpms_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_TTL=60
```

### 5. Generate Application Key (if not already done)
```bash
php artisan key:generate
```

### 6. Generate JWT Secret (if not already done)
```bash
php artisan jwt:secret
```

### 7. Run Database Migrations
```bash
php artisan migrate
```

### 8. Seed Database with Test Data
```bash
php artisan db:seed
```

### 9. Compile Frontend Assets

For development (with file watching):
```bash
npm run watch
```

For development (single compilation):
```bash
npm run dev
```

For production:
```bash
npm run prod
```

### 10. Start Laravel Development Server
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## Development Workflow

1. **Watch Mode**: Run `npm run watch` in one terminal
2. **Laravel Server**: Run `php artisan serve` in another terminal
3. Make changes to files in `resources/js` or `resources/css`
4. Laravel Mix will automatically recompile on file changes
5. Refresh browser to see changes

## Available Commands

- `npm run dev` - Compile assets for development
- `npm run watch` - Watch files and recompile on changes
- `npm run hot` - Hot module replacement (advanced)
- `npm run prod` - Compile and minify assets for production

## API Configuration

The frontend communicates with the Laravel API through:
- Base URL: Configured in `.env` as `MIX_API_BASE_URL`
- Authentication: JWT tokens stored in localStorage
- CORS: Configured in `config/cors.php`

## Test Accounts

After seeding the database:

**Admin Account**
- Email: `admin@sfpms.edu`
- Password: `admin123`

**Faculty Account**
- Email: `john.smith@sfpms.edu`
- Password: `faculty123`

**Student Account**
- Email: `alice.williams@student.sfpms.edu`
- Password: `student123`

## File Structure Conventions

- **Components**: All React components use `.jsx` extension
- **Utilities**: Pure JavaScript files use `.js` extension
- **Imports**: Use `@/` alias for imports from `resources/js`
- **Styling**: Tailwind CSS classes with custom CSS variables

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Laravel Mix 6
- **CSS Framework**: Tailwind CSS 3
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: Sonner

## Troubleshooting

### Assets Not Loading
- Run `npm run dev` to compile assets
- Check `public/js/app.js` and `public/css/app.css` exist
- Verify `mix()` helper is working in blade templates

### CORS Errors
- Ensure API URL in `.env` matches Laravel server
- Check `config/cors.php` has correct origins
- Verify `php artisan config:clear` was run

### Build Errors
- Delete `node_modules` and run `npm install` again
- Clear Laravel Mix cache: `rm -rf public/js public/css public/mix-manifest.json`
- Run `npm run dev` again

### Authentication Issues
- Verify JWT secret is set: `php artisan jwt:secret`
- Check API endpoints are accessible
- Verify CORS configuration allows credentials

## Additional Resources

- Laravel Mix Documentation: https://laravel-mix.com/docs
- React Documentation: https://react.dev
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Radix UI Documentation: https://www.radix-ui.com/docs

