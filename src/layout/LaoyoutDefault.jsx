import PropTypes from "prop-types";
import { Header } from "../components/Header";
const LayoutDefault = ({ children }) => {
  return (
    <div className="max-w-dashboard mx-auto min-h-dashboard">
      <Header />
      <div className="flex flex-col p-8 gap-8">{children}</div>
    </div>
  );
};

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutDefault };
