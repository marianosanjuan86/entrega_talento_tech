import React from "react";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import Loader from "../components/estaticos/Loader";
import ProductList from "../components/ProductList";

const GaleriaDeProductos = ({
  cart,
  productos,
  cargando,
  agregarCarrito,
  borrarProducto,
}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <h1>Galeria de productos</h1>
      {cargando ? (
        <img src={Loader} alt="loader" />
      ) : (
        <ProductList agregarCarrito={agregarCarrito} productos={productos} />
      )}

      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
