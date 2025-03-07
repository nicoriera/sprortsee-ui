import PropTypes from 'prop-types'
import { NavLeft } from '../components/NavLeft'
import { Header } from '../components/Header'

/**
 * Composant LayoutDefault qui affiche le layout de la page
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Contenu enfant à afficher
 * @returns {React.ReactElement} Composant LayoutDefault
 */
const LayoutDefault = ({ children }) => {
  return (
    <div className="container mx-auto ">
      <NavLeft />
      <div className="flex-1">
        <Header />
        <main className=" bg-white px-20 mt-14 ml-24 pt-16 pb-10 ">{children}</main>
      </div>
    </div>
  )
}

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired
}

export { LayoutDefault }
