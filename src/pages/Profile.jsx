import { useState, useEffect } from 'react'
import UserService from '../service/user'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router-dom'
import { CardInfo } from '../components/CardInfo'
import { BarChart } from '../components/BarChart'
import { LineChart } from '../components/LineChart'
import { RadarChart } from '../components/RadarChart'
import { RadialBarChart } from '../components/RadialBarChart'
const Profile = () => {
  const [user, setUser] = useState(null)
  const [keyData, setKeyData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.fetchUserInfo(id)
        setUser(userData)
        setKeyData(userData.keyData)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <Loader />
  if (!user) return <div>Erreur de chargement</div>

  return (
    <div>
      <div>
        <h1 className="text-black text-5xl font-medium leading-normal">
          Bonjour <span className="text-red-500"> {user.userInfos.firstName}</span>
        </h1>
        <p className="text-black text-lg mt-4 font-normal leading-normal">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      <div className="grid grid-flow-col gap-8 mt-12 h-full">
        <section className="grid grid-flow-row gap-8">
          <BarChart userId={id} />
          <div className="flex justify-between h-full gap-8 ">
            <LineChart userId={id} />
            <RadarChart userId={id} />
            <RadialBarChart userId={id} />
          </div>
        </section>
        <section className="grid grid-flow-row gap-8">
          <CardInfo typeKeyData="Calories" value={keyData.calorieCount} />
          <CardInfo typeKeyData="Protéines" value={keyData.proteinCount} />
          <CardInfo typeKeyData="Glucides" value={keyData.carbohydrateCount} />
          <CardInfo typeKeyData="Lipides" value={keyData.lipidCount} />
        </section>
      </div>
    </div>
  )
}

export { Profile }
