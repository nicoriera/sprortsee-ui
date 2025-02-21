import PropTypes from "prop-types";
import { NavLeft } from "../components/NavLeft";
import { Header } from "../components/Header";
const LayoutDefault = ({ children }) => {
  return (
    <div className="flex h-full">
      <NavLeft />
      <div className="flex-1">
        <Header />
        <main className="max-w-dashboard mx-auto min-h-dashboard bg-white px-20 mt-24 ml-24 pb-28">
          {children}
        </main>
      </div>
    </div>
  );
};

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutDefault };
