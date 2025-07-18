import React, { useContext } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mostrar spinner mientras carga
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" size="lg" />
        <p className="mt-3">Verificando autenticación...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          <FaExclamationTriangle size={48} className="mb-3 text-warning" />
          <h4>Acceso Restringido</h4>
          <p>
            No tienes permisos para acceder a esta sección.
            {user?.role === "cliente"
              ? " Esta área es solo para administradores."
              : " Se requieren permisos especiales."}
          </p>
          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="me-3"
            >
              <FaHome className="me-2" />
              Ir al Inicio
            </Button>
            {user?.role === "cliente" && (
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Volver
              </Button>
            )}
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Conectado como: <strong>{user?.name}</strong> ({user?.role})
            </small>
          </div>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
