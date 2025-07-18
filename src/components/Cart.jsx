import React, { useContext, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Cart = ({ isOpen, onClose }) => {
  const [imageErrors, setImageErrors] = useState({});
  const { cart, handleAddToCart, handleDeleteFromCart, vaciarCarrito } =
    useContext(CartContext);

  const getTotal = () => {
    return cart
      .reduce((total, item) => {
        const precio = parseFloat(item.precio);
        return total + precio * item.cantidad;
      }, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const handleRemoveItem = (producto) => {
    handleDeleteFromCart(producto);
  };

  const handleIncreaseQuantity = (producto) => {
    if (producto.cantidad < producto.stock) {
      handleAddToCart({ ...producto, cantidad: producto.cantidad + 1 }, false);
      toast.success(`Cantidad aumentada: ${producto.nombre}`);
    }
  };

  const handleDecreaseQuantity = (producto) => {
    if (producto.cantidad > 1) {
      handleAddToCart({ ...producto, cantidad: producto.cantidad - 1 }, false);
      toast.info(`Cantidad disminuida: ${producto.nombre}`);
    } else {
      handleDeleteFromCart(producto);
      toast.info(`${producto.nombre} eliminado del carrito`);
    }
  };

  const handleEmptyCart = () => {
    if (vaciarCarrito) {
      vaciarCarrito();
    }
  };

  const renderImagePlaceholder = () => (
    <div
      className="d-flex align-items-center justify-content-center bg-light border rounded"
      style={{ width: "60px", height: "60px" }}
    >
      <span style={{ fontSize: "1.5rem", opacity: 0.5 }}>📦</span>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "400px",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">
            <FaShoppingCart className="me-2" />
            Carrito ({getTotalItems()})
          </h5>
          <Button
            variant="outline-light"
            size="sm"
            onClick={onClose}
            className="rounded-circle p-2"
          >
            <FaTimes />
          </Button>
        </div>

        {/* Content */}
        <div
          className="flex-grow-1 overflow-auto"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {cart.length === 0 ? (
            <div className="text-center p-5">
              <div style={{ fontSize: "4rem", opacity: 0.3 }}>🛒</div>
              <h5 className="mt-3 text-muted">Tu carrito está vacío</h5>
              <p className="text-muted small">
                ¡Agrega algunos juguetes increíbles!
              </p>
            </div>
          ) : (
            <div className="p-3">
              {cart.map((item) => (
                <Card key={item.id} className="mb-3 shadow-sm border-0">
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      {/* Imagen */}
                      <Col xs={3}>
                        {imageErrors[item.id] ? (
                          renderImagePlaceholder()
                        ) : (
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="img-fluid rounded"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            onError={() => handleImageError(item.id)}
                          />
                        )}
                      </Col>

                      {/* Información del producto */}
                      <Col xs={9}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6
                            className="mb-0 text-truncate pe-2"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {item.nombre}
                          </h6>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveItem(item)}
                            className="rounded-circle p-1"
                            style={{ width: "30px", height: "30px" }}
                          >
                            <FaTrash size={12} />
                          </Button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-bold text-primary">
                              ${item.precio}
                            </div>
                            <div className="text-success small fw-bold">
                              Total: $
                              {(
                                parseFloat(item.precio) * item.cantidad
                              ).toFixed(2)}
                            </div>
                          </div>

                          {/* Controles de cantidad */}
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDecreaseQuantity(item)}
                              className="rounded-circle p-1 me-2"
                              style={{ width: "30px", height: "30px" }}
                            >
                              <FaMinus size={10} />
                            </Button>

                            <Badge bg="light" text="dark" className="px-2 py-1">
                              {item.cantidad}
                            </Badge>

                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleIncreaseQuantity(item)}
                              className="rounded-circle p-1 ms-2"
                              style={{ width: "30px", height: "30px" }}
                              disabled={item.cantidad >= item.stock}
                            >
                              <FaPlus size={10} />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-top p-3 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total:</h5>
              <h4 className="mb-0 text-primary fw-bold">${getTotal()}</h4>
            </div>

            <div className="d-grid gap-2">
              <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  className="flex-fill"
                  onClick={onClose}
                >
                  Seguir Comprando
                </Button>
                <Button
                  variant="outline-danger"
                  className="flex-fill"
                  onClick={handleEmptyCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
