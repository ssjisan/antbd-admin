import PropTypes from "prop-types";

export const Edit = ({ color, size }) => {
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
          d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z"
          fill={color}
        />
        <path
          d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const EventList = ({ color, size }) => {
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
          d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75022V2C8.75022 1.59 8.41022 1.25 8.00022 1.25C7.59022 1.25 7.25022 1.59 7.25022 2V3.56C4.55022 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
          fill={color}
        />
        <path
          opacity="0.4"
          d="M20 9.83984C20.55 9.83984 21 10.2898 21 10.8398V16.9998C21 19.9998 19.5 21.9998 16 21.9998H8C4.5 21.9998 3 19.9998 3 16.9998V10.8398C3 10.2898 3.45 9.83984 4 9.83984H20Z"
          fill={color}
        />
        <path
          d="M8.5 14.9999C8.37 14.9999 8.24 14.9699 8.12 14.9199C8 14.8699 7.89001 14.7999 7.79001 14.7099C7.70001 14.6099 7.62999 14.4999 7.57999 14.3799C7.52999 14.2599 7.5 14.1299 7.5 13.9999C7.5 13.8699 7.52999 13.7399 7.57999 13.6199C7.62999 13.4999 7.70001 13.3899 7.79001 13.2899C7.89001 13.1999 8 13.1299 8.12 13.0799C8.36 12.9799 8.64 12.9799 8.88 13.0799C9 13.1299 9.10999 13.1999 9.20999 13.2899C9.29999 13.3899 9.37001 13.4999 9.42001 13.6199C9.47001 13.7399 9.5 13.8699 9.5 13.9999C9.5 14.1299 9.47001 14.2599 9.42001 14.3799C9.37001 14.4999 9.29999 14.6099 9.20999 14.7099C9.10999 14.7999 9 14.8699 8.88 14.9199C8.76 14.9699 8.63 14.9999 8.5 14.9999Z"
          fill={color}
        />
        <path
          d="M12 14.9996C11.87 14.9996 11.74 14.9696 11.62 14.9196C11.5 14.8696 11.39 14.7996 11.29 14.7096C11.11 14.5196 11 14.2596 11 13.9996C11 13.7396 11.11 13.4796 11.29 13.2896C11.39 13.1996 11.5 13.1296 11.62 13.0796C11.86 12.9696 12.14 12.9696 12.38 13.0796C12.5 13.1296 12.61 13.1996 12.71 13.2896C12.89 13.4796 13 13.7396 13 13.9996C13 14.2596 12.89 14.5196 12.71 14.7096C12.61 14.7996 12.5 14.8696 12.38 14.9196C12.26 14.9696 12.13 14.9996 12 14.9996Z"
          fill={color}
        />
        <path
          d="M8.5 18.4999C8.37 18.4999 8.24 18.4699 8.12 18.4199C8 18.3699 7.89001 18.2999 7.79001 18.2099C7.61001 18.0199 7.5 17.7599 7.5 17.4999C7.5 17.2399 7.61001 16.9799 7.79001 16.7899C7.89001 16.6999 8 16.6299 8.12 16.5799C8.36 16.4799 8.64 16.4799 8.88 16.5799C9 16.6299 9.10999 16.6999 9.20999 16.7899C9.38999 16.9799 9.5 17.2399 9.5 17.4999C9.5 17.7599 9.38999 18.0199 9.20999 18.2099C9.10999 18.2999 9 18.3699 8.88 18.4199C8.76 18.4699 8.63 18.4999 8.5 18.4999Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const EyeOff = ({ color, size }) => {
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
          d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.47 14.53L2 22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L14.53 9.47"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const EyeOn = ({ color, size }) => {
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
          d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 20.27C15.5301 20.27 18.8201 18.19 21.1101 14.59C22.0101 13.18 22.0101 10.81 21.1101 9.39997C18.8201 5.79997 15.5301 3.71997 12.0001 3.71997C8.47009 3.71997 5.18009 5.79997 2.89009 9.39997C1.99009 10.81 1.99009 13.18 2.89009 14.59C5.18009 18.19 8.47009 20.27 12.0001 20.27Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Enrollment = ({ color, size }) => {
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
          d="M16.755 2H7.24502C6.08614 2 5.50671 2 5.03939 2.16261C4.15322 2.47096 3.45748 3.18719 3.15795 4.09946C3 4.58055 3 5.17705 3 6.37006V20.3742C3 21.2324 3.985 21.6878 4.6081 21.1176C4.97417 20.7826 5.52583 20.7826 5.8919 21.1176L6.375 21.5597C7.01659 22.1468 7.98341 22.1468 8.625 21.5597C9.26659 20.9726 10.2334 20.9726 10.875 21.5597C11.5166 22.1468 12.4834 22.1468 13.125 21.5597C13.7666 20.9726 14.7334 20.9726 15.375 21.5597C16.0166 22.1468 16.9834 22.1468 17.625 21.5597L18.1081 21.1176C18.4742 20.7826 19.0258 20.7826 19.3919 21.1176C20.015 21.6878 21 21.2324 21 20.3742V6.37006C21 5.17705 21 4.58055 20.842 4.09946C20.5425 3.18719 19.8468 2.47096 18.9606 2.16261C18.4933 2 17.9139 2 16.755 2Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M10.5 11L17 11"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 11H7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 7.5H7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 14.5H7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10.5 7.5H17"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10.5 14.5H17"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const EyeBold = ({ color, size }) => {
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
          d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const ExerciseVideo = ({ color, size }) => {
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
          d="M17 4C17 5.10457 16.1046 6 15 6C13.8954 6 13 5.10457 13 4C13 2.89543 13.8954 2 15 2C16.1046 2 17 2.89543 17 4Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.21002 6.0468C7.60385 5.17566 9.33593 5.04228 10.8467 5.68975C12.0283 6.19616 12.3248 7.73583 11.4158 8.64486L9.76183 10.2988C9.41236 10.6483 9.43841 11.2224 9.81807 11.5388L10.8145 12.3691C11.4073 12.8631 11.75 13.5949 11.75 14.3665V16C11.75 16.4142 11.4142 16.75 11 16.75C10.5858 16.75 10.25 16.4142 10.25 16V14.3665C10.25 14.04 10.105 13.7304 9.85422 13.5215L8.8578 12.6911C7.80052 11.8101 7.728 10.2113 8.70117 9.23817L10.3551 7.5842C10.5138 7.42555 10.462 7.15685 10.2558 7.06847C9.19661 6.61452 7.98224 6.70804 7.00502 7.3188L4.8975 8.636C4.54625 8.85553 4.08353 8.74875 3.864 8.3975C3.64447 8.04625 3.75125 7.58353 4.1025 7.364L6.21002 6.0468Z"
          fill={color}
        />
        <path
          d="M3.08684 22H19.4888C20.8757 22 22 20.8757 22 19.4888C22 17.9288 20.5926 16.7463 19.0559 17.0152L18.8931 17.0437L20.0333 9.00028L20.0338 8.99741C20.0864 8.64672 20.1179 8.44447 20.1568 8.29849C20.1744 8.23252 20.1885 8.19883 20.1965 8.18288C20.2002 8.17549 20.2029 8.17144 20.2029 8.17144L20.2037 8.17041L20.2047 8.16955C20.2047 8.16955 20.2086 8.1666 20.2159 8.16256C20.2314 8.15385 20.2644 8.13813 20.3294 8.11734C20.4737 8.07123 20.6749 8.02987 21.0244 7.95998L22.1471 7.73544C22.5533 7.6542 22.8167 7.25908 22.7354 6.85291C22.6542 6.44674 22.2591 6.18333 21.8529 6.26456L20.6963 6.49589C20.3927 6.55657 20.1072 6.61364 19.8728 6.68852C19.6117 6.77197 19.3447 6.89746 19.1177 7.13579C18.8906 7.37412 18.7782 7.64686 18.7076 7.91172C18.6441 8.14941 18.601 8.43736 18.5551 8.74354L18.5499 8.77776L17.3395 17.3156L2.89949 19.8426C2.37943 19.9336 2 20.3852 2 20.9132C2 21.5134 2.48659 22 3.08684 22Z"
          fill={color}
        />
        <g opacity="0.5">
          <path
            d="M11.75 10C11.75 9.58579 12.0858 9.25 12.5 9.25H15.5C15.9142 9.25 16.25 9.58579 16.25 10C16.25 10.4142 15.9142 10.75 15.5 10.75H12.5C12.0858 10.75 11.75 10.4142 11.75 10Z"
            fill={color}
          />
          <path
            d="M7.53033 13.4697C7.82322 13.7626 7.82322 14.2374 7.53033 14.5303L7.2019 14.8588L7.1165 14.9443C6.62299 15.4387 6.2324 15.8301 5.72395 16.0407C5.2155 16.2513 4.6626 16.2507 3.964 16.2501L3.84315 16.25H3C2.58579 16.25 2.25 15.9142 2.25 15.5C2.25 15.0858 2.58579 14.75 3 14.75H3.84315C4.72184 14.75 4.95226 14.7367 5.14993 14.6549C5.34759 14.573 5.51991 14.4194 6.14124 13.7981L6.46967 13.4697C6.76256 13.1768 7.23744 13.1768 7.53033 13.4697Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};
Edit.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EventList.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EyeOff.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EyeOn.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Enrollment.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EyeBold.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
ExerciseVideo.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
