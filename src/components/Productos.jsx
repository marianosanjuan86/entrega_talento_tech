import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import "./styleProductos.css";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { cart } = useContext(CartContext);

  const increase = () => {
    if (cantidad < producto.stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrease = () => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 0));
  };

  const handleAgregarCarrito = () => {
    if (cantidad > 0) {
      agregarCarrito({ ...producto, cantidad: cantidad });
      Swal.fire({
        title: "¡Agregado al carrito!",
        text: `${producto.nombre} (x${cantidad}) se agregó a tu carrito`,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#fff",
        color: "#333",
        iconColor: "#28a745",
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderPlaceholder = () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#6c757d",
        border: "2px dashed #dee2e6",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "8px", opacity: 0.5 }}>
        📦
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: "500",
          textAlign: "center",
          lineHeight: "1.4",
        }}
      >
        Imagen no disponible
      </div>
    </div>
  );

  useEffect(() => {
    const productInCart = cart.find((item) => item.id === producto.id);
    if (!productInCart) {
      setCantidad(0);
    }
  }, [cart, producto.id]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        border: "1px solid #f0f0f0",
        height: "580px",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-4px)";
        e.target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "220px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {imageError ? (
          renderPlaceholder()
        ) : (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={handleImageError}
            style={{
              paddingTop: "5%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: producto.stock > 5 ? "#28a745" : "#dc3545",
            color: "white",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          Stock: {producto.stock}
        </div>
      </div>

      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#333",
              lineHeight: "1.3",
              height: "44px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {producto.nombre}
          </h3>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: "#2c5aa0",
              marginBottom: "16px",
            }}
          >
            ${producto.precio}
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "12px 0",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <button
              onClick={decrease}
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid #2c5aa0",
                backgroundColor: "white",
                color: "#2c5aa0",
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
                e.target.style.backgroundColor = "#2c5aa0";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#2c5aa0";
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#333",
                minWidth: "40px",
                textAlign: "center",
                padding: "8px 16px",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "2px solid #e9ecef",
              }}
            >
              {cantidad}
            </span>
            <button
              onClick={increase}
              disabled={cantidad >= producto.stock}
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid #2c5aa0",
                backgroundColor: cantidad >= producto.stock ? "#ccc" : "white",
                color: cantidad >= producto.stock ? "#666" : "#2c5aa0",
                borderRadius: "50%",
                cursor: cantidad >= producto.stock ? "not-allowed" : "pointer",
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (cantidad < producto.stock) {
                  e.target.style.backgroundColor = "#2c5aa0";
                  e.target.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (cantidad < producto.stock) {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#2c5aa0";
                }
              }}
            >
              +
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              onClick={handleAgregarCarrito}
              disabled={producto.stock === 0}
              style={{
                width: "100%",
                padding: "10px 15px",
                backgroundColor: producto.stock === 0 ? "#ccc" : "#2c5aa0",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: producto.stock === 0 ? "not-allowed" : "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (producto.stock > 0) {
                  e.target.style.backgroundColor = "#1e3a5f";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (producto.stock > 0) {
                  e.target.style.backgroundColor = "#2c5aa0";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {producto.stock === 0 ? (
                <>😔 Sin stock</>
              ) : (
                <>🛒 Agregar al carrito</>
              )}
            </button>
            <Link
              to={`/productos/${producto.id}`}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 15px",
                backgroundColor: "transparent",
                color: "#2c5aa0",
                border: "2px solid #2c5aa0",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "600",
                textAlign: "center",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2c5aa0";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#2c5aa0";
              }}
            >
              👁️ Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
