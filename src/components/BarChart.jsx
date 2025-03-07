import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import UserService from '../service/user'
import { createActivityChart } from '../utils/buildBarChart'
import { Loader } from './Loader'

/**
 * Composant BarChart qui affiche un graphique à barres des activités d'un utilisateur
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {number} props.userId - ID de l'utilisateur dont les données sont à afficher
 * @param {string} props.containerId - ID du conteneur DOM où le graphique sera rendu
 *
 * @returns {React.ReactElement} Composant BarChart
 */

const BarChart = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchDataActivity = useCallback(async () => {
    try {
      const data = await UserService.fetchUserActivity(userId)
      setData(data)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchDataActivity()
  }, [fetchDataActivity])

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const chart = createActivityChart('activity-chart')
      chart.initialize(data)
      return chart.cleanup
    }
  }, [data, isLoading])

  return <>{isLoading ? <Loader /> : <div id="activity-chart" className="activity-chart"></div>}</>
}

BarChart.propTypes = {
  userId: PropTypes.number.isRequired
}

export { BarChart }
