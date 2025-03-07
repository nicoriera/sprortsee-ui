import { NavLink } from 'react-router-dom'

/**
 * Composant Header qui affiche le header de la page
 * @component
 * @returns {React.ReactElement} Composant Header
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre de la page
 * @param {string} props.icon - Icône de la page
 * @param {string} props.link - Lien de la page
 */

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 ">
      <div className="w-full h-24 bg-black items-center flex flex-row drop-shadow-md pl-4">
        <div className="flex  h-16  items-center gap-2">
          <div className="flex items-center">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl text-red-500">SportSee</h1>
          </div>
        </div>
        <div className="inline-flex w-full h-full items-center">
          <nav className="inline-flex grow shrink-1 text-2xl justify-around items-center text-white  list-none">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `cursor-pointer w-[100px] text-center ${isActive ? 'font-bold' : ''}`
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/profile/12"
              className={({ isActive }) =>
                `cursor-pointer w-[100px] text-center ${isActive ? 'font-bold' : ''}`
              }
            >
              Profil
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `cursor-pointer w-[100px] text-center ${isActive ? 'font-bold' : ''}`
              }
            >
              Réglage
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `cursor-pointer w-[100px] text-center ${isActive ? 'font-bold' : ''}`
              }
            >
              Communauté
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export { Header }
