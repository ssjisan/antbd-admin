import PropTypes from "prop-types";

export const Blog = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M3 8C3 5.17157 3 3.75736 3.87868 2.87868C4.75736 2 6.17157 2 9 2H15C17.8284 2 19.2426 2 20.1213 2.87868C21 3.75736 21 5.17157 21 8V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H9C6.17157 22 4.75736 22 3.87868 21.1213C3 20.2426 3 18.8284 3 16V8Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75 2.0127V22.0116H7.25V2.0127H8.75Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.25 8C1.25 7.58579 1.58579 7.25 2 7.25H4C4.41421 7.25 4.75 7.58579 4.75 8C4.75 8.41421 4.41421 8.75 4 8.75H2C1.58579 8.75 1.25 8.41421 1.25 8ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM1.25 16C1.25 15.5858 1.58579 15.25 2 15.25H4C4.41421 15.25 4.75 15.5858 4.75 16C4.75 16.4142 4.41421 16.75 4 16.75H2C1.58579 16.75 1.25 16.4142 1.25 16Z"
          fill={color}
        />
        <path
          d="M10.75 6.5C10.75 6.08579 11.0858 5.75 11.5 5.75H16.5C16.9142 5.75 17.25 6.08579 17.25 6.5C17.25 6.91421 16.9142 7.25 16.5 7.25H11.5C11.0858 7.25 10.75 6.91421 10.75 6.5Z"
          fill={color}
        />
        <path
          d="M10.75 10C10.75 9.58579 11.0858 9.25 11.5 9.25H16.5C16.9142 9.25 17.25 9.58579 17.25 10C17.25 10.4142 16.9142 10.75 16.5 10.75H11.5C11.0858 10.75 10.75 10.4142 10.75 10Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const Bullet = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="6" width="12" height="12" rx="6" fill={color} />
      </svg>
    </div>
  );
};

export const BurgerMenu = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.3077 8H3.69231C3.31385 8 3 7.54667 3 7C3 6.45333 3.31385 6 3.69231 6H20.3077C20.6862 6 21 6.45333 21 7C21 7.54667 20.6862 8 20.3077 8Z"
          fill={color}
        />
        <path
          opacity="0.4"
          d="M19.7694 12.5H4.23063C3.55789 12.5 3 12.0467 3 11.5C3 10.9533 3.55789 10.5 4.23063 10.5H19.7694C20.4421 10.5 21 10.9533 21 11.5C21 12.0467 20.4585 12.5 19.7694 12.5Z"
          fill={color}
        />
        <path
          d="M20.3077 17H3.69231C3.31385 17 3 16.5467 3 16C3 15.4533 3.31385 15 3.69231 15H20.3077C20.6862 15 21 15.4533 21 16C21 16.5467 20.6862 17 20.3077 17Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
Blog.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Bullet.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
BurgerMenu.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
