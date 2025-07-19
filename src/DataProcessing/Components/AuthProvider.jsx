import { useEffect, useState } from "react";

export default function AuthProvider() {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, token: parsedData.token, user: parsedData.user });
    }
  }, []);
  return {
    auth,
    setAuth,
  };
}


