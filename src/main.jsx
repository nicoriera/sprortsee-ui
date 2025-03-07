import { createRoot } from 'react-dom/client'
import { Router } from './routes/index'
import './index.css'

/**
 * Composant principal de l'application
 * @component
 * @returns {React.ReactElement} Composant principal
 *
 */

const root = createRoot(document.getElementById('root'))

root.render(<Router />)
