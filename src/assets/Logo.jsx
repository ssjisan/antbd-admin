import PropTypes from "prop-types";

export const Logo = ({ width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.6943 2.7363C33.124 2.0273 31.3826 1.6333 29.5486 1.6333C22.63 1.6333 17.022 7.2413 17.022 14.16C17.022 14.1806 17.022 14.2026 17.0233 14.2233H34.6946V2.7363H34.6943Z"
          fill="url(#paint0_linear_1890_162)"
        />
        <path
          d="M8.28992 25.762C8.77425 26.6466 9.31125 27.4983 9.89825 28.311C10.6463 29.347 11.4736 30.322 12.3716 31.226C10.5706 29.425 8.08225 28.311 5.33459 28.311H5.33325V38.3753H15.2843C15.2856 38.3373 15.2856 38.2996 15.2856 38.262C15.2856 35.542 14.1946 33.0773 12.4279 31.2823C13.8043 32.66 15.3466 33.8716 17.0219 34.887C20.6766 37.1016 24.9643 38.3756 29.5499 38.3756C31.3156 38.3756 33.0359 38.1866 34.6943 37.8276V25.5826C34.5563 25.646 34.4159 25.706 34.2756 25.762C32.8173 26.3573 31.2213 26.6856 29.5483 26.6856C27.8753 26.6856 26.2793 26.3573 24.8213 25.762C20.2636 23.9046 17.0473 19.4413 17.0229 14.2236H5.33459C5.34559 18.404 6.41559 22.3343 8.28992 25.762Z"
          fill="url(#paint1_linear_1890_162)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1890_162"
            x1="11.9773"
            y1="-8.69203"
            x2="50.4723"
            y2="38.928"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#792DF8" />
            <stop offset="1" stopColor="#C60A8D" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1890_162"
            x1="-3.04641"
            y1="3.45263"
            x2="35.4486"
            y2="51.0726"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#792DF8" />
            <stop offset="1" stopColor="#C60A8D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

Logo.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};