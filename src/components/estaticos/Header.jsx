import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Cart from "../Cart";
import "./styleEstatico.css";

const Header = ({ borrarProducto }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const { cart } = useContext(CartContext);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/" className="link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/acercade" className="link">
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link to="/productos" className="link">
              Galeria de productos
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="link">
              Contacto
            </Link>
          </li>
          <li className="cartnav">
            <button className="btnCart" onClick={() => setCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <Cart
              borrarProducto={borrarProducto}
              cartItems={cart}
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
          </li>
          <li className="btnLogin">
            <Link to="/login" className="link">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          </li>
          <li className="btnAdmin">
            <Link to="/admin" className="link">
              <i className="fa-solid fa-user-tie"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
