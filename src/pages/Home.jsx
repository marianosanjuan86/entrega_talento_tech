import React, { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaGraduationCap, FaStar, FaTruck } from "react-icons/fa";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import Loader from "../components/estaticos/Loader";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { CartContext } from "../context/CartContext";

const Home = () => {
  const { cargando, error } = useContext(CartContext);

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <h2 className="text-danger">Error al cargar productos</h2>
        <p>Por favor, intenta nuevamente más tarde.</p>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <section
          className="text-center mb-4 py-4 text-white"
          style={{
            background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
            margin: "0",
            borderRadius: "0",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <h1 className="display-4 fw-bold mb-3">
                  ¡Bienvenidos a JugueteLandia! 🎮
                </h1>
                <p className="lead mb-0">
                  Descubre el mundo mágico de los juguetes donde la diversión y
                  el aprendizaje se encuentran. Tenemos todo lo que necesitas
                  para hacer sonreír a los pequeños.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <Container className="my-4">
          <Row className="g-3">
            <Col xs={12} sm={6} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-3">
                  <FaGraduationCap className="text-warning mb-2" size={40} />
                  <Card.Title className="h5 text-warning">
                    Educativos
                  </Card.Title>
                  <Card.Text className="small">
                    Juguetes que enseñan mientras divierten
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-3">
                  <FaStar className="text-success mb-2" size={40} />
                  <Card.Title className="h5 text-success">
                    Calidad Premium
                  </Card.Title>
                  <Card.Text className="small">
                    Materiales seguros y duraderos
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-3">
                  <FaTruck className="text-primary mb-2" size={40} />
                  <Card.Title className="h5 text-primary">
                    Envío Rápido
                  </Card.Title>
                  <Card.Text className="small">
                    Llega a tu casa en 24-48 horas
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="mb-4">
          <section>
            <h2 className="text-center h3 mb-4">
              🎯 Nuestros Juguetes Favoritos
            </h2>

            <SearchBar />

            {cargando ? (
              <Loader mensaje="🧸 Cargando juguetes mágicos..." />
            ) : (
              <>
                <ProductList />
                <Pagination />
              </>
            )}
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Home;
