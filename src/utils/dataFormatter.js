/**
 * Service pour formater les données de l'API
 */

export const DataFormatter = {
  /**
   * Formate les données utilisateur
   * @param {Object} data - Données brutes de l'API
   * @returns {Object} Données formatées
   */
  formatUserData: (data) => {
    if (!data) return null

    return {
      id: data.id,
      userInfos: {
        firstName: data.userInfos.firstName,
        lastName: data.userInfos.lastName,
        age: data.userInfos.age
      },
      score: data.score || data.todayScore || 0,
      keyData: {
        calorieCount: data.keyData.calorieCount,
        proteinCount: data.keyData.proteinCount,
        carbohydrateCount: data.keyData.carbohydrateCount,
        lipidCount: data.keyData.lipidCount
      }
    }
  },

  /**
   * Formate les données d'activité
   * @param {Object} data - Données brutes de l'API
   * @returns {Array} Données formatées
   */
  formatActivityData: (data) => {
    if (!data?.sessions) return []

    return data.sessions.map((session, index) => ({
      day: index + 1,
      kilogram: session.kilogram,
      calories: session.calories
    }))
  },

  /**
   * Formate les données de sessions moyennes
   * @param {Object} data - Données brutes de l'API
   * @returns {Array} Données formatées
   */
  formatAverageSessionsData: (data) => {
    if (!data?.sessions) return []

    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    return data.sessions.map((session) => ({
      day: days[session.day - 1],
      sessionLength: session.sessionLength
    }))
  },

  /**
   * Formate les données de performance
   * @param {Object} data - Données brutes de l'API
   * @returns {Array} Données formatées
   */
  formatPerformanceData: (data) => {
    if (!data?.data) return []

    const kinds = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité'
    }

    return data.data.map((item) => ({
      value: item.value,
      kind: kinds[item.kind]
    }))
  }
}
