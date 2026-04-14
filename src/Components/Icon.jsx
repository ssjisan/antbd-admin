import PropTypes from "prop-types";
import icons from "../assets/Icon";

const Icon = ({ name, size = 24, color = "#060415" }) => {
  const IconComponent = icons[name?.toLowerCase()];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

export default Icon;
