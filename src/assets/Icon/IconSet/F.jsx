import PropTypes from "prop-types";

export const Folder = ({ color, size }) => {
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
          d="M22 11.0699V16.6499C22 19.5999 19.6 21.9999 16.65 21.9999H7.35C4.4 21.9999 2 19.5999 2 16.6499V9.43994H21.74C21.89 9.88994 21.97 10.3499 21.99 10.8399C22 10.9099 22 10.9999 22 11.0699Z"
          fill={color}
        />
        <path
          opacity="0.4"
          d="M21.74 9.44H2V6.42C2 3.98 3.98 2 6.42 2H8.75C10.38 2 10.89 2.53 11.54 3.4L12.94 5.26C13.25 5.67 13.29 5.73 13.87 5.73H16.66C19.03 5.72 21.05 7.28 21.74 9.44Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const FinalList = ({ color, size }) => {
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
          d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M9 13.4L10.7143 15L15 11"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
export const Filter = ({ color, size }) => {
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
          d="M16.959 9.75C16.5448 9.75 16.209 9.41421 16.209 9L16.209 2C16.209 1.58579 16.5448 1.25 16.959 1.25C17.3732 1.25 17.709 1.58579 17.709 2L17.709 9C17.709 9.41421 17.3732 9.75 16.959 9.75Z"
          fill={color}
        />
        <path
          d="M7 12.5C5.34315 12.5 4 11.1569 4 9.5C4 7.84315 5.34315 6.5 7 6.5C8.65685 6.5 10 7.84315 10 9.5C10 11.1569 8.65685 12.5 7 12.5Z"
          fill={color}
        />
        <path
          d="M17 11.5C15.3431 11.5 14 12.8431 14 14.5C14 16.1569 15.3431 17.5 17 17.5C18.6569 17.5 20 16.1569 20 14.5C20 12.8431 18.6569 11.5 17 11.5Z"
          fill={color}
        />
        <path
          d="M6.20901 15C6.20901 14.5858 6.5448 14.25 6.95901 14.25C7.37322 14.25 7.70901 14.5858 7.70901 15V22C7.70901 22.4142 7.37322 22.75 6.95901 22.75C6.5448 22.75 6.20901 22.4142 6.20901 22V15Z"
          fill={color}
        />
        <path
          d="M16.959 22.75C16.5448 22.75 16.209 22.4142 16.209 22V20C16.209 19.5858 16.5448 19.25 16.959 19.25C17.3732 19.25 17.709 19.5858 17.709 20V22C17.709 22.4142 17.3732 22.75 16.959 22.75Z"
          fill={color}
        />
        <path
          d="M6.20901 2C6.20901 1.58579 6.5448 1.25 6.95901 1.25C7.37322 1.25 7.70901 1.58579 7.70901 2V4C7.70901 4.41421 7.37322 4.75 6.95901 4.75C6.5448 4.75 6.20901 4.41421 6.20901 4V2Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const Form = ({ color, size }) => {
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
          d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
          fill={color}
        />
        <path
          d="M16.5189 16.5013C16.6939 16.3648 16.8526 16.2061 17.1701 15.8886L21.1275 11.9312C21.2231 11.8356 21.1793 11.6708 21.0515 11.6264C20.5844 11.4644 19.9767 11.1601 19.4083 10.5917C18.8399 10.0233 18.5356 9.41561 18.3736 8.94849C18.3292 8.82066 18.1644 8.77687 18.0688 8.87254L14.1114 12.8299C13.7939 13.1474 13.6352 13.3061 13.4987 13.4811C13.3377 13.6876 13.1996 13.9109 13.087 14.1473C12.9915 14.3476 12.9205 14.5606 12.7786 14.9865L12.5951 15.5368L12.3034 16.4118L12.0299 17.2323C11.9601 17.4419 12.0146 17.6729 12.1708 17.8292C12.3271 17.9854 12.5581 18.0399 12.7677 17.9701L13.5882 17.6966L14.4632 17.4049L15.0135 17.2214L15.0136 17.2214C15.4394 17.0795 15.6524 17.0085 15.8527 16.913C16.0891 16.8004 16.3124 16.6623 16.5189 16.5013Z"
          fill={color}
        />
        <path
          d="M22.3665 10.6922C23.2112 9.84754 23.2112 8.47812 22.3665 7.63348C21.5219 6.78884 20.1525 6.78884 19.3078 7.63348L19.1806 7.76071C19.0578 7.88348 19.0022 8.05496 19.0329 8.22586C19.0522 8.33336 19.0879 8.49053 19.153 8.67807C19.2831 9.05314 19.5288 9.54549 19.9917 10.0083C20.4545 10.4712 20.9469 10.7169 21.3219 10.847C21.5095 10.9121 21.6666 10.9478 21.7741 10.9671C21.945 10.9978 22.1165 10.9422 22.2393 10.8194L22.3665 10.6922Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H11C11.4142 12.25 11.75 12.5858 11.75 13C11.75 13.4142 11.4142 13.75 11 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
Folder.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
FinalList.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Filter.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Form.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
