import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const { setIsAuthenticated } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) validationErrors.email = "Email es requerido";
    if (!password) validationErrors.password = "Password es requerido";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("data/users.json");
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: "Credenciales inválidas" });
      } else {
        console.log("User role:", foundUser.role);

        if (foundUser.role === "admin") {
          setIsAuthenticated(true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrors({
        email: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "70vh",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Iniciar Sesión
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="formBasicEmail"
                style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
              >
                Email address
              </label>
              <input
                id="formBasicEmail"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "0.75rem",
                  border: `1px solid ${errors.email ? "red" : "#ced4da"}`,
                  borderRadius: "0.25rem",
                  fontSize: "1rem",
                }}
              />
              {errors.email && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.email}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="formBasicPassword"
                style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
              >
                Password
              </label>
              <input
                id="formBasicPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "0.75rem",
                  border: `1px solid ${errors.password ? "red" : "#ced4da"}`,
                  borderRadius: "0.25rem",
                  fontSize: "1rem",
                }}
              />
              {errors.password && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.75rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Credenciales de prueba */}
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            <strong>💡 Credenciales de prueba:</strong>
            <p>
              Revisa tu archivo <code>data/users.json</code> para ver los
              usuarios disponibles
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
