import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RutaProtegida from "./auth/RutasProtegidas";
import DetallesProductos from "./components/DetallesProductos";
import { CartContext } from "./context/CartContext";
import AcercaDe from "./pages/AcercaDe";
import Admin from "./pages/Admin";
import Contactos from "./pages/Contactos";
import GaleriaDeProductos from "./pages/GaleriaDeProductos";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const {
    cart,
    productos,
    cargando,
    handleAddToCart,
    handleDeleteFromCart,
    isAuthenticated,
  } = useContext(CartContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              productos={productos}
              cargando={cargando}
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
            />
          }
        />

        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/productos" element={<GaleriaDeProductos />} />
        <Route
          path="/productos/:id"
          element={<DetallesProductos productos={productos} />}
        />
        <Route
          path="/contacto"
          element={
            <Contactos borrarProducto={handleDeleteFromCart} cart={cart} />
          }
        />
        <Route
          path="/admin"
          element={
            <RutaProtegida isAuthenticated={isAuthenticated}>
              {" "}
              <Admin />{" "}
            </RutaProtegida>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
