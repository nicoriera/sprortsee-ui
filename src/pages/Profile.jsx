import { useState, useEffect } from "react";
import UserService from "../service/user";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.fetchUserInfo(12);
        setUser(userData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Erreur de chargement</div>;

  return (
    <>
      <h1>Bonjour {user.userInfos.firstName}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteneurs des graphiques */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          {/* Graphique 1 */}
        </div>
        {/* Autres graphiques */}
      </div>
    </>
  );
};

export { Profile };
