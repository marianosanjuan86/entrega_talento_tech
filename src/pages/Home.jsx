import React from "react";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import Loader from "../components/estaticos/Loader";
import ProductList from "../components/ProductList";

const Home = ({
  cart,
  borrarProducto,
  cargando,
  agregarCarrito,
  productos,
}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main style={{ padding: "2rem", minHeight: "70vh" }}>
        {/* Hero Section */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            padding: "2rem",
            background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
            color: "white",
            borderRadius: "15px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            🧸 ¡Bienvenidos a JugueteLandia! 🎮
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Descubre el mundo mágico de los juguetes donde la diversión y el
            aprendizaje se encuentran. Tenemos todo lo que necesitas para hacer
            sonreír a los pequeños y estimular su creatividad e imaginación.
          </p>
        </section>

        {/* Características destacadas */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              backgroundColor: "#fff3e0",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎓</div>
            <h3 style={{ color: "#ff6b35", marginBottom: "0.5rem" }}>
              Educativos
            </h3>
            <p style={{ color: "#666" }}>
              Juguetes que enseñan mientras divierten
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              backgroundColor: "#e8f5e8",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌟</div>
            <h3 style={{ color: "#4caf50", marginBottom: "0.5rem" }}>
              Calidad Premium
            </h3>
            <p style={{ color: "#666" }}>Materiales seguros y duraderos</p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚚</div>
            <h3 style={{ color: "#2196f3", marginBottom: "0.5rem" }}>
              Envío Rápido
            </h3>
            <p style={{ color: "#666" }}>Llega a tu casa en 24-48 horas</p>
          </div>
        </section>

        {/* Productos */}
        <section>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "#333",
              marginBottom: "2rem",
            }}
          >
            🎯 Nuestros Juguetes Favoritos
          </h2>

          {cargando ? (
            <Loader mensaje="🧸 Cargando juguetes mágicos..." />
          ) : (
            <ProductList
              agregarCarrito={agregarCarrito}
              productos={productos}
            />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
