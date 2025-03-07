import PropTypes from 'prop-types'
import { dataIconCardInfo } from '../utils/dataCardInfo'

/**
 * Composant CardInfo qui affiche une carte d'information avec un icône, une valeur et une étiquette
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.typeKeyData - Type de données à afficher
 * @param {number} props.value - Valeur à afficher
 * @param {string} props.icon - Icône à afficher
 * @param {string} props.label - Étiquette à afficher
 * @param {string} props.unit - Unité à afficher
 * @returns {React.ReactElement} Composant CardInfo
 */

const CardInfo = ({ typeKeyData, value }) => {
  const icon = dataIconCardInfo.getIcon(typeKeyData)
  const label = dataIconCardInfo.getLabel(typeKeyData)
  const unit = dataIconCardInfo.getUnit(typeKeyData)
  return (
    <div className="bg-neutral-50 flex justify-between rounded-md gap-4 p-8 items-center w-full">
      <div className="w-16 h-16">
        <img src={`/${icon}`} alt={typeKeyData} />
      </div>
      <div className="flex flex-col">
        <p className="text-neutral-700 text-xl font-bold">
          {value}
          {unit}
        </p>
        <p className="text-neutral-500 text-sm font-medium">{label}</p>
      </div>
    </div>
  )
}

CardInfo.propTypes = {
  typeKeyData: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export { CardInfo }
