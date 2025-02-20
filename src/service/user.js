import axios from "axios";
import { DataFormatter } from "../utils/dataFormatter";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Fonction utilitaire générique pour les requêtes API
 * @param {string} endpoint - Point de terminaison de l'API
 * @returns {Promise} Données de la réponse
 */
const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la requête vers ${endpoint}:`, error);
    throw error;
  }
};

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
    const data = await fetchData(`/user/${userId}`);
    return DataFormatter.formatUserData(data.data);
  },

  /**
   * Récupère les données d'activité d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données d'activité
   */
  fetchUserActivity: async (userId) => {
    const data = await fetchData(`/user/${userId}/activity`);
    return DataFormatter.formatActivityData(data.data);
  },

  /**
   * Récupère les sessions moyennes d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données des sessions moyennes
   */
  fetchUserAverageSessions: async (userId) => {
    const data = await fetchData(`/user/${userId}/average-sessions`);
    return DataFormatter.formatAverageSessionsData(data.data);
  },

  /**
   * Récupère les données de performance d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Données de performance
   */
  fetchUserPerformance: async (userId) => {
    const data = await fetchData(`/user/${userId}/performance`);
    return DataFormatter.formatPerformanceData(data.data);
  },
};

export default UserService;
