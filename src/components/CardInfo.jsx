import PropTypes from "prop-types";
import { dataIconCardInfo } from "../utils/dataCardInfo";

const CardInfo = ({ typeKeyData, value }) => {
  const icon = dataIconCardInfo.getIcon(typeKeyData);
  const label = dataIconCardInfo.getLabel(typeKeyData);
  const unit = dataIconCardInfo.getUnit(typeKeyData);
  return (
    <div className="bg-neutral-50 flex rounded-md gap-4 p-8 items-center">
      <div>
        <img src={`/${icon}`} alt={typeKeyData} />
      </div>
      <div className="flex flex-col">
        <p className="text-neutral-700 text-xl font-bold">
          {value}
          {unit}
        </p>
        <p className="text-neutral-500 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
};

CardInfo.propTypes = {
  typeKeyData: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export { CardInfo };
