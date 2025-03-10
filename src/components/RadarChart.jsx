import { useState, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import UserService from '../service/user'
import { Loader } from './Loader'
import { createRadarChart } from '../utils/buildRadarChart'

/**
 * Composant RadarChart qui affiche un graphique radar des performances d'un utilisateur
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {number} props.userId - ID de l'utilisateur dont les données sont à afficher
 * @param {string} props.containerId - ID du conteneur DOM où le graphique sera rendu
 * @returns {React.ReactElement} Composant RadarChart
 */

const RadarChart = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const svgRef = useRef(null)

  const fetchDataPerformance = useCallback(async () => {
    try {
      const data = await UserService.fetchUserPerformance(userId)
      setData(data)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchDataPerformance()
  }, [fetchDataPerformance])

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const chart = createRadarChart('radar-chart')
      chart.initialize(data)
      return chart.cleanup
    }
  }, [data, isLoading])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div
      id="radar-chart"
      className="radar-chart"
      style={{ background: '#282D30', borderRadius: '5px' }}
    >
      <svg ref={svgRef}></svg>
    </div>
  )
}

RadarChart.propTypes = {
  userId: PropTypes.number.isRequired
}

export { RadarChart }
