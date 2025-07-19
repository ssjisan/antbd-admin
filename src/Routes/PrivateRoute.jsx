import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function PrivateRoute() {
  const { auth } = useContext(DataContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      //eslint-disable-next-line
      const { data } = await axios.get("/auth-check");
      if (auth?.token) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);


  return isUserLoggedIn ? <Outlet /> : <Loading />;
}
