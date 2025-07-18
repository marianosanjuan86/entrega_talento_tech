import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaTruck,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      {/* Sección Principal Compacta */}
      <div className="py-4">
        <Container>
          <Row className="g-4">
            {/* Información de la Empresa */}
            <Col lg={3} md={6}>
              <h5 className="fw-bold text-primary mb-3">JugueteLandia</h5>
              <p className="text-light small mb-3">
                Tu tienda de confianza para los mejores juguetes.
              </p>

              {/* Redes Sociales Compactas */}
              <div className="d-flex gap-2">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", padding: "0" }}
                >
                  <FaFacebookF size={14} />
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", padding: "0" }}
                >
                  <FaInstagram size={14} />
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", padding: "0" }}
                >
                  <FaTwitter size={14} />
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle"
                  style={{ width: "32px", height: "32px", padding: "0" }}
                >
                  <FaWhatsapp size={14} />
                </Button>
              </div>
            </Col>

            {/* Enlaces Rápidos */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3">Enlaces</h6>
              <div className="d-flex flex-column gap-1">
                <a href="/" className="text-light text-decoration-none small">
                  Inicio
                </a>
                <a
                  href="/contactos"
                  className="text-light text-decoration-none small"
                >
                  Contacto
                </a>
                <a
                  href="/acerca-de"
                  className="text-light text-decoration-none small"
                >
                  Acerca de
                </a>
                <a
                  href="/admin"
                  className="text-light text-decoration-none small"
                >
                  Admin
                </a>
              </div>
            </Col>

            {/* Información de Contacto */}
            <Col lg={3} md={6}>
              <h6 className="fw-bold mb-3">Contacto</h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-2" size={12} />
                  <small className="text-light">+54 11 1234-5678</small>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-2" size={12} />
                  <small className="text-light">info@juguetelandia.com</small>
                </div>
                <div className="d-flex align-items-start">
                  <FaMapMarkerAlt
                    className="text-primary me-2 mt-1"
                    size={12}
                  />
                  <small className="text-light">
                    Av. San Martín 1234, Adrogue
                  </small>
                </div>
              </div>
            </Col>

            {/* Garantías y Copyright */}
            <Col lg={3} md={5}>
              <h6 className="fw-bold mb-3">Garantías</h6>
              <div className="d-flex flex-column gap-1 mb-3">
                <div className="d-flex align-items-center">
                  <FaTruck className="text-success me-2" size={12} />
                  <small className="text-light">Envío gratis +$50</small>
                </div>
                <div className="d-flex align-items-center">
                  <FaLock className="text-warning me-2" size={12} />
                  <small className="text-light">Compra 100% segura</small>
                </div>
                <div className="d-flex align-items-center">
                  <small className="text-light">
                    {" "}
                    © 2025 JugueteLandia. Todos los derechos reservados.
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
