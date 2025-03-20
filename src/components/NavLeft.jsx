import { Link } from 'react-router-dom'

/**
 * Composant NavLeft qui affiche le menu de navigation à gauche
 * @component
 * @returns {React.ReactElement} Composant NavLeft
 */

const NavLeft = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 flex flex-col w-28 h-full bg-black items-center justify-center gap-52 ">
        <div className="flex flex-col gap-4 ">
          <Link to="/">
            <img
              src="/bicycle.svg"
              alt="bicycle"
              className="w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer"
            />
          </Link>
          <Link to="/">
            <img
              src="/dumbell.svg"
              alt="dumbell"
              className="w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer"
            />
          </Link>
          <Link to="/">
            <img
              src="/swim.svg"
              alt="swim"
              className="w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer"
            />
          </Link>
          <Link to="/">
            <img
              src="/yoga.svg"
              alt="yoga"
              className="w-12 h-12 rounded-md bg-white flex items-center justify-center cursor-pointer"
            />
          </Link>
        </div>
        <div className=" w-40 -rotate-90 text-white text-xs font-medium leading-normal">
          Copiryght, SportSee 2020
        </div>
      </div>
    </div>
  )
}

export { NavLeft }
