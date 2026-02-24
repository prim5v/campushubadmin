import React, { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../../utils/ApiSocket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until session check completes

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await Api.get("/auth/profile");
        setUser(res?.user || null);
      } catch (err) {
        // setUser(null); // unauthorized
      } finally {
        setLoading(false); // important: stop loading so UI knows auth check is done
      }
    };
    verify();
  }, []);

  const login = async (payload) => {
    try {
      const res = await Api.post("/auth/admin_login", payload);
      setUser(res?.user || null);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await Api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading, // expose loading to allow conditional rendering
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};