import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "../api/auth.api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sewapath_token");
    if (!token) {
      setInitializing(false);
      return;
    }
    authApi
      .fetchMe()
      .then(({ user: me }) => setUser(me))
      .catch(() => localStorage.removeItem("sewapath_token"))
      .finally(() => setInitializing(false));
  }, []);

  const login = async (email, password) => {
    const { token, user: loggedInUser } = await authApi.login({
      email,
      password,
    });
    localStorage.setItem("sewapath_token", token);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (payload) => {
    const { token, user: newUser } = await authApi.register(payload);
    localStorage.setItem("sewapath_token", token);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("sewapath_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      register,
      logout,
      isAdmin: user?.role === "admin",
    }),
    [user, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
