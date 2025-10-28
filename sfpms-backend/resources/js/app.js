import './bootstrap'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from 'sonner'
import App from '@/components/app'

// Get the root element
const rootElement = document.getElementById('app')

if (rootElement) {
  // Create root and render the app
  const root = createRoot(rootElement)
  
  root.render(
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}
