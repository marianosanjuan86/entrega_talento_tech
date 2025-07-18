import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      let userData = null;

      if (email === "admin@juguetelandia.com" && password === "admin123") {
        userData = {
          id: 1,
          name: "Administrador",
          email: email,
          role: "admin",
        };
      } else if (
        email === "cliente@juguetelandia.com" &&
        password === "cliente123"
      ) {
        userData = {
          id: 2,
          name: "Cliente",
          email: email,
          role: "cliente",
        };
      }

      // Si las credenciales son válidas
      if (userData) {
        const token = "mock_token_" + Date.now();

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(userData));

        setIsAuthenticated(true);
        setUser(userData);

        // Mensaje personalizado según el rol
        if (userData.role === "admin") {
          toast.success("¡Bienvenido Administrador! 🎉");
        } else {
          toast.success("¡Bienvenido a JugueteLandia! 🛒");
        }

        return { success: true, user: userData };
      } else {
        toast.error("Credenciales incorrectas");
        return { success: false, error: "Credenciales incorrectas" };
      }
    } catch {
      toast.error("Error al iniciar sesión");
      return { success: false, error: "Error al iniciar sesión" };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setIsAuthenticated(false);
    setUser(null);
    toast.info("Sesión cerrada correctamente");
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
