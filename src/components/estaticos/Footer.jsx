import React from "react";
import "./styleEstatico.css";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2c5aa0",
        color: "white",
        padding: "40px 20px",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "0.9rem",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <span>© 2025 JugueteLandia</span>
          <span>•</span>
          <span>Hecho con ❤️ para los pequeños</span>
          <span>•</span>
          <span>Todos los derechos reservados</span>
        </div>

        <div
          style={{
            fontSize: "0.8rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "8px",
          }}
        >
          <p style={{ margin: 0 }}>
            🚚 Envíos gratis en compras mayores a $50 | 🔒 Compra 100% segura |
            ⭐ Calidad garantizada
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
