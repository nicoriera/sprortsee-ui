/**
 * Composant Loader qui affiche un loader de chargement
 * @component
 * @returns {React.ReactElement} Composant Loader
 */

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
    </div>
  )
}

export { Loader }
