import PropTypes from "prop-types";

export const EditorBold = ({ size, color }) => {
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
          d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorItalic = ({ size, color }) => {
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
          d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorUnderline = ({ size, color }) => {
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
          d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorLeft = ({ size, color }) => {
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
          d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorRight = ({ size, color }) => {
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
          d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorJustify = ({ size, color }) => {
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
          d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorCenter = ({ size, color }) => {
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
          d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorImage = ({ size, color }) => {
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
          d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorListOrdered = ({ size, color }) => {
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
          d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorListUnordered = ({ size, color }) => {
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
          d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorQuote = ({ size, color }) => {
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
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M9 9v-7h7v7.1c0 4.8-4.5 5.4-4.5 5.4l-0.6-1.4c0 0 2-0.3 2.4-1.9 0.4-1.2-0.4-2.2-0.4-2.2h-3.9z"
        ></path>
        <path
          fill={color}
          d="M0 9v-7h7v7.1c0 4.8-4.5 5.4-4.5 5.4l-0.6-1.4c0 0 2-0.3 2.4-1.9 0.4-1.2-0.4-2.2-0.4-2.2h-3.9z"
        ></path>
      </svg>
    </div>
  );
};

export const EditorHeading1 = ({ size, color }) => {
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
          d="M5.4739 17C5.15797 17 5 16.8264 5 16.4792V7.5625C5 7.21528 5.15797 7.04167 5.4739 7.04167H6.50293C6.81886 7.04167 6.97683 7.21528 6.97683 7.5625V10.9583H10.6191V7.5625C10.6191 7.21528 10.777 7.04167 11.093 7.04167H12.122C12.4379 7.04167 12.5959 7.21528 12.5959 7.5625V16.4792C12.5959 16.8264 12.4379 17 12.122 17H11.093C10.777 17 10.6191 16.8264 10.6191 16.4792V12.6806H6.97683V16.4792C6.97683 16.8264 6.81886 17 6.50293 17H5.4739Z"
          fill={color}
        />
        <path
          d="M15.1817 9.09722C15.0644 8.87037 15.1434 8.69444 15.4187 8.56944C15.6805 8.44907 15.9535 8.28009 16.2379 8.0625C16.5222 7.84491 16.7546 7.62037 16.9352 7.38889C17.1383 7.12963 17.3323 7 17.5174 7H18.5938C18.8646 7 19 7.13889 19 7.41667V16.5833C19 16.8611 18.8646 17 18.5938 17H17.5106C17.2398 17 17.1044 16.8611 17.1044 16.5833V9.97917C17.1044 9.79398 17.1134 9.6088 17.1315 9.42361H17.1044C16.9645 9.60417 16.811 9.75926 16.6441 9.88889C16.4771 10.0185 16.3078 10.1204 16.1363 10.1944C15.9242 10.287 15.764 10.2269 15.6556 10.0139L15.1817 9.09722Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorHeading2 = ({ size, color }) => {
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
          d="M4.46034 17C4.15345 17 4 16.8283 4 16.4849V7.66621C4 7.3228 4.15345 7.1511 4.46034 7.1511H5.45995C5.76685 7.1511 5.92029 7.3228 5.92029 7.66621V11.0247H9.45837V7.66621C9.45837 7.3228 9.61182 7.1511 9.91872 7.1511H10.9183C11.2252 7.1511 11.3787 7.3228 11.3787 7.66621V16.4849C11.3787 16.8283 11.2252 17 10.9183 17H9.91872C9.61182 17 9.45837 16.8283 9.45837 16.4849V12.728H5.92029V16.4849C5.92029 16.8283 5.76685 17 5.45995 17H4.46034Z"
          fill={color}
        />
        <path
          d="M13.7722 17C13.4434 17 13.279 16.8512 13.279 16.5536V16.2239C13.279 15.9858 13.3842 15.75 13.5946 15.5165L15.561 13.353C16.1528 12.6983 16.6943 12.1168 17.1853 11.6085C17.6764 11.0957 17.9219 10.5783 17.9219 10.0563C17.9219 9.53434 17.7969 9.15201 17.547 8.90934C17.3015 8.66209 16.988 8.53846 16.6066 8.53846C16.0016 8.53846 15.5807 8.68498 15.3439 8.97802C15.1072 9.27106 14.9362 9.58471 14.831 9.91896C14.7302 10.244 14.546 10.3608 14.2786 10.2692L13.6144 10.0357C13.3995 9.95788 13.3382 9.74267 13.4302 9.39011C13.6012 8.73535 13.9498 8.17445 14.4759 7.70742C15.002 7.23581 15.7824 7 16.817 7C17.8956 7 18.6782 7.29075 19.1648 7.87225C19.6515 8.44918 19.8948 9.07647 19.8948 9.75412C19.8948 10.6424 19.5397 11.4231 18.8294 12.0962C18.1192 12.7647 17.4747 13.4171 16.896 14.0536L15.778 15.283V15.3242C16.041 15.3059 16.2602 15.2967 16.4356 15.2967H19.5068C19.8356 15.2967 20 15.4455 20 15.7431V16.5536C20 16.8512 19.8356 17 19.5068 17H13.7722Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorHeading3 = ({ size, color }) => {
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
          d="M4.45474 16.7718C4.15158 16.7718 4 16.604 4 16.2685V7.65101C4 7.31544 4.15158 7.14765 4.45474 7.14765H5.44217C5.74533 7.14765 5.8969 7.31544 5.8969 7.65101V10.9329H9.39189V7.65101C9.39189 7.31544 9.54347 7.14765 9.84662 7.14765H10.8341C11.1372 7.14765 11.2888 7.31544 11.2888 7.65101V16.2685C11.2888 16.604 11.1372 16.7718 10.8341 16.7718H9.84662C9.54347 16.7718 9.39189 16.604 9.39189 16.2685V12.5973H5.8969V16.2685C5.8969 16.604 5.74533 16.7718 5.44217 16.7718H4.45474Z"
          fill={color}
        />
        <path
          d="M13.4583 16.0872C13.2894 15.9396 13.2764 15.7293 13.4193 15.4564L13.7181 14.8926C13.861 14.6197 14.0927 14.5996 14.4132 14.8322C14.6817 15.0291 14.9849 15.1902 15.3227 15.3154C15.6605 15.4362 16.0373 15.4966 16.453 15.4966C17.0247 15.4966 17.434 15.3378 17.6808 15.0201C17.9277 14.698 18.0511 14.3378 18.0511 13.9396C18.0511 13.5324 17.9039 13.1678 17.6094 12.8456C17.3192 12.519 16.9078 12.3557 16.3751 12.3557H15.8749C15.5934 12.3557 15.4526 12.2371 15.4526 12V11.2617C15.4526 11.0157 15.5934 10.8926 15.8749 10.8926H16.2647C16.6631 10.8926 17.0139 10.7651 17.317 10.5101C17.6245 10.255 17.7783 9.93512 17.7783 9.55034C17.7783 9.25056 17.6765 9.00224 17.473 8.80537C17.2737 8.60403 16.9468 8.50336 16.492 8.50336C16.0633 8.50336 15.693 8.56823 15.3812 8.69799C15.0693 8.82774 14.8225 8.98434 14.6406 9.16779C14.3807 9.43177 14.1577 9.42058 13.9715 9.13423L13.5947 8.56376C13.4518 8.34899 13.4951 8.12975 13.7246 7.90604C14.0364 7.59732 14.4392 7.36913 14.9329 7.22148C15.4266 7.07383 15.9095 7 16.3816 7C17.4946 7 18.3218 7.23043 18.8632 7.69128C19.4045 8.14765 19.6752 8.70694 19.6752 9.36913C19.6752 9.8613 19.489 10.311 19.1165 10.7181C18.7441 11.1208 18.35 11.3982 17.9342 11.5503V11.5772C18.4279 11.7025 18.8956 11.9776 19.3374 12.4027C19.7791 12.8233 20 13.3468 20 13.9732C20 14.953 19.7012 15.7025 19.1035 16.2215C18.5059 16.7405 17.5942 17 16.3686 17C15.8532 17 15.3184 16.9195 14.764 16.7584C14.214 16.5928 13.7788 16.3691 13.4583 16.0872Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorHeading4 = ({ size, color }) => {
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
          d="M4.45511 17C4.1517 17 4 16.8264 4 16.4792V7.5625C4 7.21528 4.1517 7.04167 4.45511 7.04167H5.44334C5.74674 7.04167 5.89845 7.21528 5.89845 7.5625V10.9583H9.39627V7.5625C9.39627 7.21528 9.54797 7.04167 9.85138 7.04167H10.8396C11.143 7.04167 11.2947 7.21528 11.2947 7.5625V16.4792C11.2947 16.8264 11.143 17 10.8396 17H9.85138C9.54797 17 9.39627 16.8264 9.39627 16.4792V12.6806H5.89845V16.4792C5.89845 16.8264 5.74674 17 5.44334 17H4.45511Z"
          fill={color}
        />
        <path
          d="M13.427 14.8333C13.1452 14.8333 13.0044 14.6829 13.0044 14.3819V13.4653C13.0044 13.2014 13.0694 12.9722 13.1994 12.7778L16.8012 7.36111C16.9616 7.12037 17.1632 7 17.4059 7H18.3616C18.6477 7 18.7907 7.15046 18.7907 7.45139V13.1111H19.5774C19.8591 13.1111 20 13.2616 20 13.5625V14.3819C20 14.6829 19.8613 14.8333 19.5839 14.8333H18.7907V16.5486C18.7907 16.8495 18.6499 17 18.3681 17H17.3929C17.1112 17 16.9703 16.8495 16.9703 16.5486V14.8333H13.427ZM14.8183 13.1111H16.9703V10.4236C16.9703 10.2384 16.979 10.0532 16.9963 9.86806H16.9703L14.8183 13.1111Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorHeading5 = ({ size, color }) => {
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
          d="M4.45846 16.7684C4.15282 16.7684 4 16.5981 4 16.2575V7.5109C4 7.1703 4.15282 7 4.45846 7H5.45397C5.75961 7 5.91243 7.1703 5.91243 7.5109V10.842H9.43603V7.5109C9.43603 7.1703 9.58885 7 9.89449 7H10.89C11.1956 7 11.3485 7.1703 11.3485 7.5109V16.2575C11.3485 16.5981 11.1956 16.7684 10.89 16.7684H9.89449C9.58885 16.7684 9.43603 16.5981 9.43603 16.2575V12.5313H5.91243V16.2575C5.91243 16.5981 5.75961 16.7684 5.45397 16.7684H4.45846Z"
          fill={color}
        />
        <path
          d="M13.4833 16.0804C13.3392 15.8806 13.3196 15.708 13.4244 15.5627L13.8828 14.9087C14.0662 14.6453 14.2889 14.6385 14.5509 14.8883C14.7081 15.0381 14.9504 15.1744 15.2779 15.297C15.6053 15.4151 15.9328 15.4741 16.2603 15.4741C16.758 15.4741 17.1772 15.3288 17.5178 15.0381C17.8627 14.7475 18.0352 14.3229 18.0352 13.7643C18.0352 13.233 17.926 12.8038 17.7077 12.4768C17.4894 12.1499 17.2252 11.9864 16.9152 11.9864C16.6489 11.9864 16.4044 12.0091 16.1817 12.0545C15.959 12.0954 15.7276 12.2248 15.4874 12.4428C15.3215 12.5926 15.1207 12.6676 14.8849 12.6676H14.171C13.8872 12.6676 13.7453 12.52 13.7453 12.2248V7.52452C13.7453 7.22934 13.8872 7.08174 14.171 7.08174H18.8866C19.1704 7.08174 19.3123 7.22934 19.3123 7.52452V8.32834C19.3123 8.62352 19.1704 8.77112 18.8866 8.77112H15.5791V10.4401C15.5791 10.6217 15.5704 10.8034 15.5529 10.985H15.5922C15.8236 10.7761 16.0813 10.6376 16.3651 10.5695C16.6489 10.4968 16.9523 10.4605 17.2754 10.4605C18.0395 10.4605 18.6836 10.733 19.2075 11.2779C19.7358 11.8183 20 12.6562 20 13.7916C20 14.8361 19.6638 15.6331 18.9914 16.1826C18.3233 16.7275 17.5287 17 16.6074 17C15.8389 17 15.1731 16.9137 14.6098 16.7411C14.0509 16.564 13.6754 16.3438 13.4833 16.0804Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const EditorHeading6 = ({ size, color }) => {
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
          d="M4.45959 16.7718C4.1532 16.7718 4 16.604 4 16.2685V7.65101C4 7.31544 4.1532 7.14765 4.45959 7.14765H5.45755C5.76395 7.14765 5.91714 7.31544 5.91714 7.65101V10.9329H9.44941V7.65101C9.44941 7.31544 9.60261 7.14765 9.909 7.14765H10.907C11.2134 7.14765 11.3666 7.31544 11.3666 7.65101V16.2685C11.3666 16.604 11.2134 16.7718 10.907 16.7718H9.909C9.60261 16.7718 9.44941 16.604 9.44941 16.2685V12.5973H5.91714V16.2685C5.91714 16.604 5.76395 16.7718 5.45755 16.7718H4.45959Z"
          fill={color}
        />
        <path
          d="M13.2637 12.2685C13.2637 10.2506 13.6161 8.86801 14.3208 8.12081C15.0299 7.3736 15.9228 7 16.9995 7C17.4197 7 17.8377 7.06264 18.2536 7.18792C18.6694 7.30872 18.9889 7.4698 19.2121 7.67114C19.4222 7.86353 19.4682 8.05145 19.35 8.2349L18.9167 8.89933C18.7766 9.11857 18.5731 9.11857 18.3061 8.89933C18.1748 8.79195 17.9822 8.70022 17.7283 8.62416C17.4788 8.54362 17.2162 8.50336 16.9405 8.50336C16.4809 8.50336 16.0585 8.72483 15.6733 9.16779C15.2881 9.60626 15.0955 10.3535 15.0955 11.4094H15.1218C15.3188 11.1051 15.5923 10.8881 15.9425 10.7584C16.2926 10.6242 16.7194 10.557 17.2228 10.557C18.1376 10.557 18.8291 10.8658 19.2975 11.4832C19.7658 12.0962 20 12.8568 20 13.7651C20 14.7494 19.7264 15.5347 19.1793 16.1208C18.6322 16.7069 17.7962 17 16.6713 17C15.472 17 14.6031 16.5906 14.0647 15.7718C13.5307 14.9485 13.2637 13.7808 13.2637 12.2685ZM15.4172 13.7987C15.4172 14.3445 15.5267 14.7651 15.7455 15.0604C15.9644 15.3512 16.2839 15.4966 16.7041 15.4966C17.1505 15.4966 17.4832 15.3736 17.7021 15.1275C17.9209 14.8814 18.0303 14.4228 18.0303 13.7517C18.0303 13.1611 17.9209 12.7315 17.7021 12.4631C17.4832 12.1946 17.1768 12.0604 16.7829 12.0604C16.3496 12.0604 16.0125 12.2416 15.7718 12.604C15.5354 12.9664 15.4172 13.3647 15.4172 13.7987Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

EditorBold.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorItalic.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorUnderline.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorRight.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorLeft.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorJustify.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorCenter.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorImage.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorListOrdered.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorListUnordered.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorQuote.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading1.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading2.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading3.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading4.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading5.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
EditorHeading6.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
