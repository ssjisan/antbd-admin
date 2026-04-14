import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loaderAnimation from "../assets/loader.json";

export default function Loading() {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((currentCounter) => currentCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login", {
        state: { from: location.pathname },
      });
    }

    return () => clearInterval(interval);
  }, [counter, navigate, location]);

  return (
    <div
      style={{
        height: "100vh",
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Lottie
        animationData={loaderAnimation}
        loop
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
}
