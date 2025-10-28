# SFPMS Frontend - Laravel Mix Integration

## Quick Start

### Windows
```bash
setup-frontend.bat
```

### Linux/Mac
```bash
chmod +x setup-frontend.sh
./setup-frontend.sh
```

## Manual Setup

```bash
# Install dependencies
npm install

# Compile assets
npm run dev

# Watch for changes (development)
npm run watch

# Build for production
npm run prod
```

## Architecture

### Frontend Stack
- **React 18**: UI framework
- **JavaScript**: No TypeScript (as requested)
- **Laravel Mix**: Asset compilation
- **Tailwind CSS**: Styling framework
- **Radix UI**: Component primitives
- **Recharts**: Data visualization
- **Sonner**: Toast notifications
- **Axios**: HTTP client

### Folder Organization
```
resources/js/
├── components/      # React components
│   ├── ui/         # Reusable UI components
│   └── *.jsx       # Feature components
├── hooks/          # Custom React hooks
├── lib/            # Utilities and libraries
│   ├── api.js      # API client
│   ├── auth.js     # Auth utilities
│   └── utils.js    # Helper functions
└── app.js          # Entry point
```

### Component Types

1. **UI Components** (`components/ui/`)
   - Reusable, styled components
   - Based on Radix UI primitives
   - Configured with Tailwind CSS

2. **Feature Components** (`components/`)
   - Business logic components
   - Management interfaces
   - Dashboard views

3. **Layout Components**
   - `app-sidebar.jsx`: Navigation sidebar
   - `dashboard-header.jsx`: Top header
   - `login-form.jsx`: Authentication

### Key Files

- **`app.js`**: Main entry point, renders React app
- **`bootstrap.js`**: Axios configuration
- **`auth-context.jsx`**: Global auth state
- **`api.js`**: API client with interceptors
- **`webpack.mix.js`**: Build configuration
- **`tailwind.config.js`**: Tailwind configuration

## API Integration

### Authentication Flow
1. User logs in via `LoginForm`
2. API returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to requests
5. Auth context manages user state

### API Client Usage
```javascript
import { apiClient } from '@/lib/api'

// Get users
const users = await apiClient.getUsers({ page: 1, per_page: 15 })

// Create user
await apiClient.createUser({ name: 'John Doe', email: 'john@example.com', ... })

// Update user
await apiClient.updateUser(userId, { name: 'Jane Doe' })

// Delete user
await apiClient.deleteUser(userId)
```

### Environment Variables
Access environment variables in JavaScript:
```javascript
const apiUrl = process.env.MIX_API_BASE_URL
```

## Development

### Hot Reload
```bash
npm run watch
```
Changes to `.jsx`, `.js`, or `.css` files will automatically trigger recompilation.

### Build Process
1. Laravel Mix reads `webpack.mix.js`
2. Compiles `resources/js/app.js` → `public/js/app.js`
3. Compiles `resources/css/app.css` → `public/css/app.css`
4. Generates `public/mix-manifest.json` for versioning

### Import Aliases
Use `@/` alias for cleaner imports:
```javascript
// Instead of: import { Button } from '../../../components/ui/button'
import { Button } from '@/components/ui/button'
```

## Styling

### Tailwind CSS
All components use Tailwind utility classes:
```jsx
<div className="flex items-center gap-4 p-6">
  <Button className="bg-purple-600 hover:bg-purple-700">
    Click Me
  </Button>
</div>
```

### CSS Variables
Custom theme variables in `resources/css/app.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... */
}
```

### Custom Utilities
```javascript
import { cn } from '@/lib/utils'

// Merge Tailwind classes
<div className={cn("base-class", conditional && "conditional-class")} />
```

## Routing

### SPA Routing
The application uses component-based routing:
- Managed in `components/app.jsx`
- `activeSection` state controls which component renders
- Sidebar navigation updates `activeSection`

### Laravel Catch-All Route
`routes/web.php`:
```php
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
```

This ensures React handles all frontend routes.

## Authentication

### Auth Context
```jsx
import { useAuth } from '@/lib/auth-context'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Please login</div>
  }
  
  return <div>Welcome {user.name}</div>
}
```

### Protected Routes
```jsx
import { useAuth } from '@/lib/auth-context'

function AdminOnlyComponent() {
  const { isAdmin } = useAuth()
  
  if (!isAdmin()) {
    return <div>Access Denied</div>
  }
  
  return <div>Admin Content</div>
}
```

## Production Deployment

```bash
# Build for production
npm run prod

# Assets are optimized, minified, and versioned
# Output: public/js/app.js, public/css/app.css
```

## Extending the Frontend

### Adding New Components
1. Create file in `resources/js/components/`
2. Use `.jsx` extension for components
3. Import required dependencies
4. Export component

Example:
```jsx
// resources/js/components/my-feature.jsx
import { Card } from '@/components/ui/card'

export function MyFeature() {
  return (
    <Card>
      <h1>My Feature</h1>
    </Card>
  )
}
```

5. Add to routing in `components/app.jsx`

### Adding New UI Components
1. Create in `resources/js/components/ui/`
2. Follow Radix UI pattern
3. Export from component file

## Performance Optimization

### Production Build
- Code splitting: Automatic with Mix
- Minification: Enabled in production
- Source maps: Disabled in production
- Cache busting: Versioning with `mix.version()`

### Best Practices
- Use React.memo for expensive components
- Implement proper loading states
- Lazy load large components
- Optimize images and assets

## Support

For issues or questions:
1. Check `FRONTEND_SETUP.md` for detailed setup
2. Review `BACKEND_SETUP.md` for API configuration
3. Check Laravel logs: `storage/logs/laravel.log`
4. Check browser console for frontend errors

## License

This project is proprietary software for educational institution use.

