import { createContext } from "react";
import PropTypes from "prop-types";
import LoginForm from "./Components/LoginForm";
import AuthProvider from "./Components/AuthProvider";
import axios from "axios";
import VideosData from "./Components/VideosData";

export const DataContext = createContext();

export default function DataProcessing({ children }) {
  // -----------------------------------------------Login Controller Start--------------------------------------------------- //
  const {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleLogin,
    isUserLoggedIn,
    setIsUserLoggedIn,
    handleLoginDetails,
    loginDetails,
  } = LoginForm();
  // -----------------------------------------------Login Controller End----------------------------------------------------- //

  // ----------------------------------------------- Video Controller Start --------------------------------------------- //

  // -----------------------------------------------Auth Provider Start--------------------------------------------------- //
  const { auth, setAuth } = AuthProvider();
  // -----------------------------------------------Auth Provider End--------------------------------------------------- //

  // Axios Configuration
  // eslint-disable-next-line
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <DataContext.Provider
      value={{
        // Auth Provider
        auth,
        setAuth,
        //Login Form Data Pass
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleLogin,
        isUserLoggedIn,
        setIsUserLoggedIn,
        handleLoginDetails,
        loginDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
// Prop types validation
DataProcessing.propTypes = {
  children: PropTypes.node.isRequired,
};
