import PropTypes from "prop-types";

export const ConnectionRequest = ({ color, size }) => {
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
          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
          fill={color}
        />
        <path
          d="M10.5431 7.51724C10.8288 7.2173 10.8172 6.74256 10.5172 6.4569C10.2173 6.17123 9.74256 6.18281 9.4569 6.48276L7.14286 8.9125L6.5431 8.28276C6.25744 7.98281 5.78271 7.97123 5.48276 8.2569C5.18281 8.54256 5.17123 9.01729 5.4569 9.31724L6.59976 10.5172C6.74131 10.6659 6.9376 10.75 7.14286 10.75C7.34812 10.75 7.5444 10.6659 7.68596 10.5172L10.5431 7.51724Z"
          fill={color}
        />
        <path
          d="M13 8.25C12.5858 8.25 12.25 8.58579 12.25 9C12.25 9.41422 12.5858 9.75 13 9.75H18C18.4142 9.75 18.75 9.41422 18.75 9C18.75 8.58579 18.4142 8.25 18 8.25H13Z"
          fill={color}
        />
        <path
          d="M10.5431 14.5172C10.8288 14.2173 10.8172 13.7426 10.5172 13.4569C10.2173 13.1712 9.74256 13.1828 9.4569 13.4828L7.14286 15.9125L6.5431 15.2828C6.25744 14.9828 5.78271 14.9712 5.48276 15.2569C5.18281 15.5426 5.17123 16.0173 5.4569 16.3172L6.59976 17.5172C6.74131 17.6659 6.9376 17.75 7.14286 17.75C7.34812 17.75 7.5444 17.6659 7.68596 17.5172L10.5431 14.5172Z"
          fill={color}
        />
        <path
          d="M13 15.25C12.5858 15.25 12.25 15.5858 12.25 16C12.25 16.4142 12.5858 16.75 13 16.75H18C18.4142 16.75 18.75 16.4142 18.75 16C18.75 15.5858 18.4142 15.25 18 15.25H13Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const Calender = ({ color, size }) => {
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
          d="M20 9.84009C20.55 9.84009 21 10.2901 21 10.8401V17.0001C21 20.0001 19.5 22.0001 16 22.0001H8C4.5 22.0001 3 20.0001 3 17.0001V10.8401C3 10.2901 3.45 9.84009 4 9.84009H20Z"
          fill={color}
        />
        <path
          d="M8.5 14.9999C8.37 14.9999 8.24 14.9699 8.12 14.9199C8 14.8699 7.89001 14.7999 7.79001 14.7099C7.70001 14.6099 7.62999 14.4999 7.57999 14.3799C7.52999 14.2599 7.5 14.1299 7.5 13.9999C7.5 13.8699 7.52999 13.7399 7.57999 13.6199C7.62999 13.4999 7.70001 13.3899 7.79001 13.2899C7.89001 13.1999 8 13.1299 8.12 13.0799C8.36 12.9799 8.64 12.9799 8.88 13.0799C9 13.1299 9.10999 13.1999 9.20999 13.2899C9.29999 13.3899 9.37001 13.4999 9.42001 13.6199C9.47001 13.7399 9.5 13.8699 9.5 13.9999C9.5 14.1299 9.47001 14.2599 9.42001 14.3799C9.37001 14.4999 9.29999 14.6099 9.20999 14.7099C9.10999 14.7999 9 14.8699 8.88 14.9199C8.76 14.9699 8.63 14.9999 8.5 14.9999Z"
          fill={color}
        />
        <path
          d="M12 15.0001C11.87 15.0001 11.74 14.9701 11.62 14.9201C11.5 14.8701 11.39 14.8001 11.29 14.7101C11.11 14.5201 11 14.2601 11 14.0001C11 13.7401 11.11 13.4801 11.29 13.2901C11.39 13.2001 11.5 13.1301 11.62 13.0801C11.86 12.9701 12.14 12.9701 12.38 13.0801C12.5 13.1301 12.61 13.2001 12.71 13.2901C12.89 13.4801 13 13.7401 13 14.0001C13 14.2601 12.89 14.5201 12.71 14.7101C12.61 14.8001 12.5 14.8701 12.38 14.9201C12.26 14.9701 12.13 15.0001 12 15.0001Z"
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

export const Clock = ({ color, size }) => {
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
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const Coverage = ({ color, size }) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C16.714 2 19.0711 2 20.5355 3.46447C21.0394 3.96833 21.3699 4.57786 21.5867 5.3527L5.3527 21.5867C4.57786 21.3699 3.96833 21.0394 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2ZM5.5 8.75732C5.5 10.5422 6.61708 12.625 8.35997 13.3698C8.76626 13.5434 9.23374 13.5434 9.64003 13.3698C11.3829 12.625 12.5 10.5422 12.5 8.75732C12.5 6.95835 10.933 5.5 9 5.5C7.067 5.5 5.5 6.95835 5.5 8.75732Z"
          fill={color}
        />
        <path
          d="M10.5 9C10.5 9.82843 9.82843 10.5 9 10.5C8.17157 10.5 7.5 9.82843 7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9Z"
          fill={color}
        />
        <g opacity="0.5">
          <path
            d="M21.8893 7.17188C22.0002 8.43338 22.0002 10.0059 22.0002 12.0002C22.0002 16.1339 22.0002 18.4552 21.0128 19.9515L15.0613 14L21.8893 7.17188Z"
            fill={color}
          />
          <path
            d="M19.9523 21.0123L14.0006 15.0607L7.17188 21.8893C8.43338 22.0002 10.0059 22.0002 12.0002 22.0002C16.1346 22.0002 18.4559 22.0002 19.9523 21.0123Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};
export const Confirmation = ({ color, size }) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const Camera = ({ color, size }) => {
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
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.02466 19H12.9753C15.7495 19 17.1367 19 18.1331 18.3463C18.5645 18.0633 18.9348 17.6997 19.2231 17.2762C19.8889 16.2978 19.8889 14.9359 19.8889 12.2121C19.8889 9.48832 19.8889 8.12641 19.2231 7.14809C18.9348 6.72457 18.5645 6.36093 18.1331 6.07794C17.4928 5.6579 16.6912 5.50776 15.464 5.45409C14.8783 5.45409 14.3741 5.01838 14.2592 4.45455C14.0869 3.60879 13.3306 3 12.4521 3H9.54783C8.66935 3 7.913 3.60879 7.74071 4.45455C7.62586 5.01838 7.12162 5.45409 6.53597 5.45409C5.30871 5.50776 4.50713 5.6579 3.86686 6.07794C3.43549 6.36093 3.06511 6.72457 2.77688 7.14809C2.11108 8.12641 2.11108 9.48832 2.11108 12.2121C2.11108 14.9359 2.11108 16.2978 2.77688 17.2762C3.06511 17.6997 3.43549 18.0633 3.86686 18.3463C4.86329 19 6.25042 19 9.02466 19Z"
          fill={color}
          stroke={color}
          strokeWidth="1.33333"
        />
        <ellipse cx="11" cy="11.8893" rx="2.66667" ry="2.66667" fill="white" />
        <path
          d="M17.2222 9.22266H16.3333"
          stroke="white"
          strokeWidth="1.33333"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const Cross = ({ color, size }) => {
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
          d="M18 6.00005L6 18M5.99995 6L17.9999 18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const CheckRead = ({ color, size }) => {
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
          d="M4 12.9L7.14286 16.5L15 7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 7.5625L11.4283 16.5625L11 16"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export const CoursesEvents = ({ color, size }) => {
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
          d="M14.217 3.49965C12.796 2.83345 11.2035 2.83345 9.78252 3.49965L5.48919 5.51246C6.27114 5.59683 6.98602 6.0894 7.31789 6.86377C7.80739 8.00594 7.2783 9.32867 6.13613 9.81817L5.06046 10.2792C4.52594 10.5082 4.22261 10.6406 4.01782 10.7456C4.0167 10.7619 4.01564 10.7788 4.01465 10.7962L9.78261 13.5003C11.2036 14.1665 12.7961 14.1665 14.2171 13.5003L20.9082 10.3634C22.3637 9.68105 22.3637 7.31899 20.9082 6.63664L14.217 3.49965Z"
          fill={color}
        />
        <path
          d="M5.54544 8.43955C5.92616 8.27638 6.10253 7.83547 5.93936 7.45475C5.7762 7.07403 5.33529 6.89767 4.95456 7.06083L3.84318 7.53714C3.28571 7.77603 2.81328 7.97849 2.44254 8.18705C2.04805 8.40898 1.70851 8.66944 1.45419 9.05513C1.19986 9.44083 1.09421 9.85551 1.04563 10.3055C0.999964 10.7284 0.999981 11.2424 1 11.8489V14.7502C1 15.1644 1.33579 15.5002 1.75 15.5002C2.16422 15.5002 2.5 15.1644 2.5 14.7502V11.8878C2.5 11.232 2.50101 10.7995 2.53696 10.4665C2.57095 10.1517 2.63046 9.99612 2.70645 9.88087C2.78244 9.76562 2.90202 9.64964 3.178 9.49438C3.46985 9.33019 3.867 9.15889 4.46976 8.90056L5.54544 8.43955Z"
          fill={color}
        />
        <path
          opacity="0.5"
          d="M5 11.258L9.78261 13.5001C11.2036 14.1663 12.7961 14.1663 14.2171 13.5001L19 11.2578V16.625C19 17.6331 18.4965 18.5768 17.6147 19.0652C16.1463 19.8784 13.796 20.9996 12 20.9996C10.204 20.9996 7.8537 19.8784 6.38533 19.0652C5.5035 18.5768 5 17.6331 5 16.625V11.258Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
CoursesEvents.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
ConnectionRequest.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Calender.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Clock.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Coverage.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Confirmation.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Camera.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Cross.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
CheckRead.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
