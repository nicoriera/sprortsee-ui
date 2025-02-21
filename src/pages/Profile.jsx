import { useState, useEffect } from "react";
import UserService from "../service/user";
import { Loader } from "../components/Loader";
import { useParams } from "react-router-dom";
import { CardInfo } from "../components/CardInfo";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("keyData", keyData);

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
          <div className="bg-neutral-50 flex rounded-md gap-4 p-8">
            <h2>Activité quotidienne</h2>
          </div>
          <div className="flex h-84 gap-8">
            <div className="bg-neutral-50 flex rounded-md gap-4 basis-1/3  p-8">
              <p>Poids (kg)</p>
              <p>40</p>
            </div>
            <div className="bg-neutral-50 flex rounded-md gap-4 basis-1/3  p-8">
              <p>Poids (kg)</p>
              <p>40</p>
            </div>
            <div className="bg-neutral-50 flex rounded-md gap-4 basis-1/3  p-8">
              <p>Poids (kg)</p>
              <p>40</p>
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
