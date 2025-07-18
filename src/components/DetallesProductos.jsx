import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft, FaShare, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const DetallesProductos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, cargando, handleAddToCart } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [imagenError, setImagenError] = useState(false);

  useEffect(() => {
    if (productos.length > 0) {
      const productoEncontrado = productos.find(
        (p) =>
          p.id === id ||
          p.id === parseInt(id) ||
          p.id === String(id) ||
          String(p.id) === String(id)
      );

      if (productoEncontrado) {
        setProducto(productoEncontrado);
      } else {
        console.log("Producto no encontrado:", id);
        console.log(
          "IDs disponibles:",
          productos.map((p) => ({ id: p.id, tipo: typeof p.id }))
        );
      }
    }
  }, [id, productos]);

  const handleAgregarAlCarrito = () => {
    if (producto && cantidad > 0) {
      handleAddToCart({ ...producto, cantidad }, true);
    }
  };

  const handleImagenError = () => {
    setImagenError(true);
  };

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>Producto no encontrado</h4>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="mt-3"
          >
            <FaArrowLeft className="me-2" />
            Volver al catálogo
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Volver
      </Button>

      <Row>
        <Col lg={6} md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <div className="position-relative">
              {!imagenError ? (
                <div
                  className="d-flex justify-content-center align-items-center bg-light"
                  style={{ height: "400px" }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={handleImagenError}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light text-muted"
                  style={{ height: "400px" }}
                >
                  <div className="text-center">
                    <FaShoppingCart size={60} className="mb-3" />
                    <p>Imagen no disponible</p>
                  </div>
                </div>
              )}

              {producto.stock > 0 ? (
                <Badge
                  bg="success"
                  className="position-absolute top-0 end-0 m-3"
                >
                  En Stock: {producto.stock}
                </Badge>
              ) : (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 end-0 m-3"
                >
                  Sin Stock
                </Badge>
              )}
            </div>
          </Card>
        </Col>

        <Col lg={6} md={6}>
          <div className="h-100">
            {/* Categoría */}
            <Badge bg="secondary" className="mb-3">
              {producto.categoria?.charAt(0).toUpperCase() +
                producto.categoria?.slice(1) || "Sin categoría"}
            </Badge>

            {/* Nombre */}
            <h1 className="display-6 fw-bold mb-3">{producto.nombre}</h1>

            {/* Precio */}
            <h2 className="text-primary mb-4">
              <strong>${producto.precio}</strong>
            </h2>

            {/* Descripción */}
            <div className="mb-4">
              <h5 className="fw-bold">Descripción:</h5>
              <p className="text-muted lead">
                {producto.descripcion || "Sin descripción disponible"}
              </p>
            </div>

            {/* Selector de Cantidad */}
            {producto.stock > 0 && (
              <div className="mb-4">
                <label className="form-label fw-bold">Cantidad:</label>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-3 fw-bold">{cantidad}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      setCantidad(Math.min(producto.stock, cantidad + 1))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="d-grid gap-2 mb-4">
              {producto.stock > 0 ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAgregarAlCarrito}
                    className="fw-bold"
                  >
                    <FaShoppingCart className="me-2" />
                    Agregar al Carrito
                  </Button>
                </>
              ) : (
                <Button variant="secondary" size="lg" disabled>
                  Producto sin stock
                </Button>
              )}
            </div>

            {/* Botón Compartir */}
            <div className="d-grid">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: producto.nombre,
                      text: producto.descripcion,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast.info("Enlace copiado al portapapeles");
                  }
                }}
              >
                <FaShare className="me-2" />
                Compartir Producto
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetallesProductos;
