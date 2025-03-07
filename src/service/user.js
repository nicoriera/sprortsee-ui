import axios from 'axios'
import { DataFormatter } from '../utils/dataFormatter'
import { MOCK_DATA } from '../mock/data'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * Fonction utilitaire générique pour les requêtes API
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {object} mockData - Données de mise en attente
 * @param {boolean} USE_MOCK - Indique si les données sont en mise en attente
 * @param {string} BASE_URL - URL de l'API
 * @returns {Promise} Données de la réponse
 */
const fetchData = async (endpoint, mockData) => {
  if (USE_MOCK) return mockData

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`)
    return response.data
  } catch (error) {
    console.warn(`API non disponible, utilisation des mocks pour ${endpoint}:`, error)
    return mockData
  }
}

/**
 * Service pour gérer les requêtes API liées aux utilisateurs
 */
const UserService = {
  /**
   * Récupère les informations principales d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données de l'utilisateur
   */
  fetchUserInfo: async (userId) => {
    const data = await fetchData(`/user/${userId}`, MOCK_DATA.USER_MAIN_DATA[userId])
    return DataFormatter.formatUserData(data.data)
  },

  /**
   * Récupère les données d'activité d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données d'activité
   */
  fetchUserActivity: async (userId) => {
    const data = await fetchData(`/user/${userId}/activity`, MOCK_DATA.USER_ACTIVITY[userId])
    return DataFormatter.formatActivityData(data.data)
  },

  /**
   * Récupère les sessions moyennes d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données des sessions moyennes
   */
  fetchUserAverageSessions: async (userId) => {
    const data = await fetchData(
      `/user/${userId}/average-sessions`,
      MOCK_DATA.USER_AVERAGE_SESSIONS[userId]
    )
    return DataFormatter.formatAverageSessionsData(data.data)
  },

  /**
   * Récupère les données de performance d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données de performance
   */
  fetchUserPerformance: async (userId) => {
    const data = await fetchData(`/user/${userId}/performance`, MOCK_DATA.USER_PERFORMANCE[userId])
    return DataFormatter.formatPerformanceData(data.data)
  }
}

export default UserService
