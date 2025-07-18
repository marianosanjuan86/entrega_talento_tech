import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AcercaDe from "./pages/AcercaDe";
import Admin from "./pages/Admin";
import Contactos from "./pages/Contactos";
import Home from "./pages/Home";
import Login from "./pages/Login";

import DetallesProductos from "./components/DetallesProductos";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:id" element={<DetallesProductos />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
