import React from "react";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";

const AcercaDe = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />

      <main style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#2c5aa0",
            marginBottom: "2rem",
          }}
        >
          Acerca De Nosotros
        </h1>

        <div style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Bienvenidos a JugueteLandia, tu tienda de confianza para encontrar
            los mejores juguetes.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            Somos una empresa familiar dedicada a traer alegría y diversión a
            los más pequeños de la casa. Ofrecemos juguetes de calidad, seguros
            y educativos.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            Nuestro objetivo es hacer que cada compra sea una experiencia
            especial, brindando el mejor servicio al cliente y productos que
            realmente valen la pena.
          </p>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "1.2rem", color: "#ff6b6b" }}>
              ¡Gracias por elegirnos! 🧸
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AcercaDe;
