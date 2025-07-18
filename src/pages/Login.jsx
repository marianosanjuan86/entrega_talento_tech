import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Badge,
} from "react-bootstrap";
import {
  FaLock,
  FaSignInAlt,
  FaUser,
  FaUserTie,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated, user } = useContext(AuthContext);

  // Redirigir según el rol del usuario
  if (isAuthenticated && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "cliente") {
      return <Navigate to="/" replace />;
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    }
  };

  const fillCredentials = (userType) => {
    if (userType === "admin") {
      setFormData({
        email: "admin@juguetelandia.com",
        password: "admin123",
      });
    } else {
      setFormData({
        email: "cliente@juguetelandia.com",
        password: "cliente123",
      });
    }
  };

  return (
    <>
      <Container fluid className="py-5 bg-light" style={{ minHeight: "70vh" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h2 className="display-6 fw-bold text-primary mb-3">
                      <FaUser className="me-2" />
                      Iniciar Sesión
                    </h2>
                    <p className="text-muted">
                      Accede con tu cuenta para una mejor experiencia
                    </p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <strong>Error:</strong> {error}
                    </Alert>
                  )}

                  {/* Credenciales de Prueba */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Credenciales de Prueba:</h6>
                    <Row className="g-3">
                      <Col md={6}>
                        <Card className="border-primary">
                          <Card.Body className="p-3 text-center">
                            <FaUserTie
                              className="text-primary mb-2"
                              size={24}
                            />
                            <h6 className="fw-bold">Administrador</h6>
                            <p className="small text-muted mb-2">
                              Gestión completa de productos
                            </p>
                            <Badge bg="primary" className="mb-2 d-block">
                              admin@juguetelandia.com
                            </Badge>
                            <Badge bg="secondary" className="mb-3 d-block">
                              admin123
                            </Badge>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => fillCredentials("admin")}
                              className="w-100"
                            >
                              Usar credenciales
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="border-success">
                          <Card.Body className="p-3 text-center">
                            <FaShoppingCart
                              className="text-success mb-2"
                              size={24}
                            />
                            <h6 className="fw-bold">Cliente</h6>
                            <p className="small text-muted mb-2">
                              Experiencia de compra personalizada
                            </p>
                            <Badge bg="success" className="mb-2 d-block">
                              cliente@juguetelandia.com
                            </Badge>
                            <Badge bg="secondary" className="mb-3 d-block">
                              cliente123
                            </Badge>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => fillCredentials("cliente")}
                              className="w-100"
                            >
                              Usar credenciales
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">
                            <FaUser className="me-2" />
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                            disabled={loading}
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">
                            <FaLock className="me-2" />
                            Contraseña
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
                            required
                            disabled={loading}
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={
                          loading || !formData.email || !formData.password
                        }
                        className="fw-bold"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Iniciando sesión...
                          </>
                        ) : (
                          <>
                            <FaSignInAlt className="me-2" />
                            Iniciar Sesión
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Login;
