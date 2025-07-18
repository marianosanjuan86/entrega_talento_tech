import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import {
  FaEye,
  FaGraduationCap,
  FaHeart,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { cart } = useContext(CartContext);

  const increase = () => {
    if (cantidad < producto.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrease = () => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const handleAgregarCarrito = async () => {
    if (cantidad > 0 && !isAdding) {
      setIsAdding(true);
      try {
        await agregarCarrito({ ...producto, cantidad: cantidad });
      } catch {
        toast.error("Error al agregar al carrito");
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderPlaceholder = () => (
    <div className="d-flex flex-column align-items-center justify-content-center bg-light border rounded h-100">
      <div style={{ fontSize: "3rem", opacity: 0.3 }}>📦</div>
      <small className="text-muted">Imagen no disponible</small>
    </div>
  );

  useEffect(() => {
    const productInCart = cart.find((item) => item.id === producto.id);
    if (!productInCart) {
      setCantidad(0);
    }
  }, [cart, producto.id]);

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      {/* Imagen del producto */}
      <div
        className="position-relative"
        style={{ height: "200px", overflow: "hidden" }}
      >
        {imageError ? (
          renderPlaceholder()
        ) : (
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            onError={handleImageError}
            style={{
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.3s ease",
            }}
            className="product-image"
          />
        )}

        {/* Badges superiores */}
        <div className="position-absolute top-0 start-0 p-2">
          {producto.destacado && (
            <Badge bg="danger" className="me-1 mb-1">
              <FaHeart className="me-1" />
              Destacado
            </Badge>
          )}
          {producto.educativo && (
            <Badge bg="success" className="mb-1">
              <FaGraduationCap className="me-1" />
              Educativo
            </Badge>
          )}
        </div>
      </div>

      {/* Contenido del producto */}
      <Card.Body className="d-flex flex-column">
        {/* Información básica */}
        <div className="mb-auto">
          <Card.Title
            className="h6 mb-2"
            style={{ height: "48px", overflow: "hidden" }}
          >
            {producto.nombre}
          </Card.Title>

          <div className="mb-2">
            <Badge bg="secondary" className="me-1">
              {producto.categoria}
            </Badge>
            <Badge bg="info" className="me-1">
              {producto.edad}
            </Badge>
          </div>

          <div className="text-primary fw-bold h5 mb-3">${producto.precio}</div>
        </div>

        {/* Controles de cantidad */}
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={decrease}
              disabled={cantidad === 0 || isAdding}
              className="rounded-circle"
              style={{ width: "35px", height: "35px" }}
            >
              <FaMinus size={12} />
            </Button>

            <Badge bg="light" text="dark" className="px-3 py-2 fs-6">
              {cantidad}
            </Badge>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={increase}
              disabled={cantidad >= producto.stock || isAdding}
              className="rounded-circle"
              style={{ width: "35px", height: "35px" }}
            >
              <FaPlus size={12} />
            </Button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            onClick={handleAgregarCarrito}
            disabled={producto.stock === 0 || cantidad === 0 || isAdding}
            className="fw-bold"
          >
            <FaShoppingCart className="me-2" />
            {isAdding
              ? "Agregando..."
              : producto.stock === 0
              ? "Sin Stock"
              : "Agregar al Carrito"}
          </Button>

          <Button
            variant="outline-primary"
            as={Link}
            to={`/productos/${producto.id}`}
            size="sm"
            disabled={isAdding}
          >
            <FaEye className="me-2" />
            Ver Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Productos;
