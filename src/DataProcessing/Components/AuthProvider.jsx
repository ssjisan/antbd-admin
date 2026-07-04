import { useState } from "react";

export default function AuthProvider() {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      return {
        user: parsed.user || null,
        token: parsed.token || "",
        permissions: parsed.permissions || [],
      };
    }

    return {
      user: null,
      token: "",
    };
  });

  const [loading] = useState(false);
  return {
    auth,
    setAuth,
    loading,
  };
}
