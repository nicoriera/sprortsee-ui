import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Pages
import { Profile } from '../pages/Profile'
import { Home } from '../pages/Home'
import { Community } from '../pages/Community'
import { Settings } from '../pages/Settings'

// Layout
import { LayoutDefault } from '../layout/LaoyoutDefault'

/**
 * Composant Router qui affiche les routes de l'application
 * @component
 * @returns {React.ReactElement} Composant Router
 *
 */

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutDefault>
              <Home />
            </LayoutDefault>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <LayoutDefault>
              <Profile />
            </LayoutDefault>
          }
        />
        <Route
          path="/community"
          element={
            <LayoutDefault>
              <Community />
            </LayoutDefault>
          }
        />
        <Route
          path="/settings"
          element={
            <LayoutDefault>
              <Settings />
            </LayoutDefault>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
