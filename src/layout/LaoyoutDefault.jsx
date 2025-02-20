import PropTypes from "prop-types";

const LayoutDefault = ({ children }) => {
  return (
    <div className="max-w-dashboard mx-auto p-8 min-h-dashboard">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">SportSee</h1>
        </div>
      </header>
      {children} {/* Ajout de children ici */}
    </div>
  );
};

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutDefault };
