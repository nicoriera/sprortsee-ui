import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <div className="w-full h-[91px] bg-black drop-shadow-md flex">
      <div className="flex px-5 h-full items-center gap-2">
        <div className="flex items-center">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="flex items-center">
          <h1 className="text-2xl text-red-500">SportSee</h1>
        </div>
      </div>
      <div className="inline-flex items-center w-full">
        <nav className="inline-flex grow shrink-1 justify-around items-center text-white gap-20 list-none">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer w-[100px] text-center ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `cursor-pointer w-[100px] text-center ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            Profil
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `cursor-pointer w-[100px] text-center ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            Réglage
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `cursor-pointer w-[100px] text-center ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            Communauté
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

Header.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export { Header };
