import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";

const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("¡Mensaje enviado exitosamente! Te responderemos pronto 📧");
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    });
    setEnviando(false);
  };

  return (
    <>
      <Header />
      <Container fluid className="py-5">
        <Container>
          <Row className="g-4">
            {/* Información de Contacto */}
            <Col lg={4} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4 text-primary">
                    Información de Contacto
                  </h4>

                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <FaPhone className="text-success me-2" />
                      Teléfono
                    </h6>
                    <p className="text-muted mb-0">+54 11 1234-5678</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <FaEnvelope className="text-primary me-2" />
                      Email
                    </h6>
                    <p className="text-muted mb-0">info@juguetelandia.com</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold">
                      <FaMapMarkerAlt className="text-danger me-2" />
                      Dirección
                    </h6>
                    <p className="text-muted mb-0">
                      Av. San Martín 1234
                      <br />
                      Lomas de Zamora, Buenos Aires
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold">
                      <FaClock className="text-warning me-2" />
                      Horarios
                    </h6>
                    <p className="text-muted mb-0">
                      Lun - Vie: 9:00 AM - 6:00 PM
                      <br />
                      Sáb: 10:00 AM - 4:00 PM
                      <br />
                      Dom: Cerrado
                    </p>
                  </div>

                  {/* Redes Sociales */}
                  <h6 className="fw-bold mb-3">Síguenos:</h6>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-circle"
                    >
                      <FaFacebookF />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle"
                    >
                      <FaInstagram />
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="rounded-circle"
                    >
                      <FaTwitter />
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="rounded-circle"
                    >
                      <FaWhatsapp />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Formulario de Contacto */}
            <Col lg={8} md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4 text-primary">
                    <FaEnvelope className="me-2" />
                    Envíanos un Mensaje
                  </h4>

                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">
                            Nombre Completo
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre completo"
                            required
                            className="border-2"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                            className="border-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="g-3 mt-2">
                      <Col>
                        <Form.Group>
                          <Form.Label className="fw-bold">Mensaje</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            placeholder="Escribe tu mensaje aquí..."
                            required
                            className="border-2"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={enviando}
                        className="fw-bold"
                      >
                        {enviando ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <FaEnvelope className="me-2" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Mapa */}
          <Row className="mt-5">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4 text-center text-primary">
                    <FaMapMarkerAlt className="me-2" />
                    Nuestra Ubicación
                  </h4>
                  <div className="mb-4">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.4088425896557!2d-58.3829161!3d-34.8063696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd34ff9cf391b%3A0x4fe3a4a0b399deee!2sAv.%20San%20Mart%C3%ADn%201234%2C%20B1846EXJ%20Adrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1626789123456!5m2!1sen!2sar"
                        title="Ubicación de JugueteLandia"
                        className="border-0 rounded"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="fw-bold">JugueteLandia</h5>
                    <p className="text-muted mb-2">
                      <FaMapMarkerAlt className="text-danger me-2" />
                      Av. San Martín 1234, Adrogue
                      <br />
                      Provincia de Buenos Aires, Argentina
                    </p>
                  </div>
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

export default Contactos;
