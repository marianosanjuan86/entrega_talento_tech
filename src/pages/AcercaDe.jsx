import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaHeart, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";

const AcercaDe = () => {
  const navigate = useNavigate();

  const estadisticas = [
    { numero: "5+", texto: "Años de experiencia" },
    { numero: "10,000+", texto: "Familias felices" },
    { numero: "500+", texto: "Productos premium" },
    { numero: "4.9/5", texto: "Calificación promedio" },
  ];

  return (
    <>
      <Header />
      <Container fluid className="py-5 bg-light">
        <Container>
          {/* Botón Volver */}
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <FaArrowLeft className="me-2" />
            Volver
          </Button>

          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <FaRocket className="me-3" />
              Acerca de JugueteLandia
            </h1>
            <p className="lead text-muted">
              Más que una tienda, somos creadores de sonrisas y momentos
              inolvidables.
            </p>
          </div>

          <Row className="g-4">
            {/* Nuestra Historia */}
            <Col lg={8}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="fw-bold text-primary mb-4">
                    Nuestra Historia
                  </h3>

                  <p className="text-muted mb-3">
                    Bienvenidos a <strong>JugueteLandia</strong>, tu tienda de
                    confianza para encontrar los mejores juguetes. Somos una
                    empresa familiar dedicada a traer alegría y diversión a los
                    más pequeños de la casa.
                  </p>

                  <p className="text-muted mb-3">
                    Ofrecemos juguetes de calidad, seguros y educativos,
                    seleccionados cuidadosamente para garantizar la mejor
                    experiencia de juego.
                  </p>

                  <p className="text-muted mb-4">
                    Nuestro objetivo es hacer que cada compra sea una
                    experiencia especial, brindando el mejor servicio al cliente
                    y productos que realmente valen la pena.
                  </p>

                  <div className="text-center p-4 bg-light rounded">
                    <h4 className="text-primary mb-2">
                      <FaHeart className="text-danger me-2" />
                      ¡Gracias por elegirnos!
                    </h4>
                    <p className="text-muted mb-0">
                      Hacemos que la magia de la infancia se mantenga viva
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Estadísticas */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-primary mb-4">
                    Nuestros Números
                  </h5>

                  {estadisticas.map((stat, index) => (
                    <div key={index} className="mb-3 text-center">
                      <h4 className="fw-bold text-success mb-1">
                        {stat.numero}
                      </h4>
                      <p className="text-muted small mb-0">{stat.texto}</p>
                      {index < estadisticas.length - 1 && (
                        <hr className="my-3" />
                      )}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default AcercaDe;
