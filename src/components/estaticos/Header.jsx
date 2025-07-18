import React, { useContext, useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Cart from "../Cart";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserRoute = () => {
    if (user?.role === "admin") {
      return "/admin";
    } else if (user?.role === "cliente") {
      return "/";
    }
    return "/";
  };

  const getUserIcon = () => {
    if (user?.role === "admin") {
      return <FaUserTie className="me-1" />;
    } else {
      return <FaUser className="me-1" />;
    }
  };

  const getUserLabel = () => {
    if (user?.role === "admin") {
      return "Administrador";
    } else if (user?.role === "cliente") {
      return "Cliente";
    }
    return user?.name || "Usuario";
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mt-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            JugueteLandia
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/acerca-de">
                Sobre nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/contactos">
                Contacto
              </Nav.Link>
            </Nav>

            <Nav>
              {/* Carrito */}
              <Nav.Link
                href="#"
                className="position-relative me-3"
                onClick={(e) => {
                  e.preventDefault();
                  setCartOpen(true);
                }}
              >
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>

              {/* Usuario/Login */}
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to={getUserRoute()} className="me-2">
                    {getUserIcon()}
                    {getUserLabel()}
                  </Nav.Link>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-1" />
                    Salir
                  </Button>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaSignInAlt className="me-1" />
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
