import { useState, useEffect } from "react";
import UserService from "../service/user";
import { Loader } from "../components/Loader";
import { useParams } from "react-router-dom";
import { CardInfo } from "../components/CardInfo";
import { BarChart } from "../components/BarChart";
import { LineChart } from "../components/LineChart";
import { RadarChart } from "../components/RadarChart";
import { RadialBarChart } from "../components/RadialBarChart";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.fetchUserInfo(id);
        setUser(userData);
        setKeyData(userData.keyData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader />;
  if (!user) return <div>Erreur de chargement</div>;

  return (
    <>
      <div>
        <h1 className="text-black text-5xl font-medium leading-normal">
          Bonjour{" "}
          <span className="text-red-500"> {user.userInfos.firstName}</span>
        </h1>
        <p className="text-black text-lg mt-4 font-normal leading-normal">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      <div
        className="grid grid-cols-5 gap-8 mt-16"
        style={{ gridTemplateColumns: "4fr  1fr" }}
      >
        <section className="grid grid-rows-2 gap-8 basis-2/3">
          <div className="bg-neutral-50 flex items-center justify-center rounded-md gap-4 ">
            <BarChart userId={id} />
          </div>
          <div className="flex h-84 gap-8">
            <div className=" flex   gap-4 basis-1/3 ">
              <LineChart userId={id} />
            </div>
            <div className=" flex   gap-4  basis-1/3  ">
              <RadarChart userId={id} />
            </div>
            <div className=" flex  gap-4 basis-1/3  ">
              <RadialBarChart userId={id} />
            </div>
          </div>
        </section>
        <section className="grid grid-rows-4 gap-8 basis-1/3">
          <CardInfo typeKeyData="Calories" value={keyData.calorieCount} />
          <CardInfo typeKeyData="Protéines" value={keyData.proteinCount} />
          <CardInfo typeKeyData="Glucides" value={keyData.carbohydrateCount} />
          <CardInfo typeKeyData="Lipides" value={keyData.lipidCount} />
        </section>
      </div>
    </>
  );
};

export { Profile };
