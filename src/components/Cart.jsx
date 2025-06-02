import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./styleCart.css";

const Cart = ({ isOpen, onClose, borrarProducto }) => {
  const [imageErrors, setImageErrors] = useState({});
  const { cart } = useContext(CartContext);

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

  const renderImagePlaceholder = () => (
    <div
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        border: "1px dashed #dee2e6",
      }}
    >
      <span style={{ fontSize: "1.5rem", opacity: 0.5 }}>📦</span>
    </div>
  );

  return (
    <>
      {isOpen && (
        <button
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            cursor: "pointer",
            zIndex: 998,
          }}
          onClick={onClose}
          aria-label="Cerrar carrito"
        />
      )}
      <div
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-400px",
          width: "400px",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.15)",
          zIndex: 999,
          transition: "right 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "2px solid #f0f0f0",
            backgroundColor: "#2c5aa0",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "bold" }}>
              🛒 Carrito ({getTotalItems()})
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                color: "#666",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
              <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>
                Tu carrito está vacío
              </h3>
              <p style={{ color: "#888" }}>
                ¡Agrega algunos juguetes increíbles!
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "16px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {imageErrors[item.id] ? (
                    renderImagePlaceholder()
                  ) : (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      }}
                      onError={() => handleImageError(item.id)}
                    />
                  )}

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#333",
                        lineHeight: "1.2",
                      }}
                    >
                      {item.nombre}
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#2c5aa0",
                          }}
                        >
                          ${item.precio}
                        </span>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            backgroundColor: "#fff",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            border: "1px solid #ddd",
                          }}
                        >
                          Cant: {item.cantidad}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "#28a745",
                          }}
                        >
                          $
                          {(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                        </div>

                        <button
                          onClick={() => borrarProducto(item)}
                          style={{
                            background: "#dc3545",
                            border: "none",
                            color: "white",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#c82333";
                            e.target.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#dc3545";
                            e.target.style.transform = "scale(1)";
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div
            style={{
              padding: "20px",
              borderTop: "2px solid #f0f0f0",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                padding: "12px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "2px solid #2c5aa0",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Total:
              </span>
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "#2c5aa0",
                }}
              >
                ${getTotal()}
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                onClick={onClose}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "#6c757d",
                  border: "2px solid #6c757d",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#6c757d";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#6c757d";
                }}
              >
                🛍️ Seguir Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
