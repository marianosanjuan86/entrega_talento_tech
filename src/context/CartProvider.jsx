import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error", error);
        setCargando(false);
        setError(true);
      });
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      const productInCart = cart.find((item) => item.id === product.id);
      if (productInCart) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: product.cantidad }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, cantidad: product.cantidad }]);
      }
    },
    [cart]
  );

  const handleDeleteFromCart = useCallback((product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === product.id) {
            if (item.cantidad > 1) {
              return { ...item, cantidad: item.cantidad - 1 };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null);
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      cart,
      productos,
      cargando,
      error,
      handleAddToCart,
      handleDeleteFromCart,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [
      cart,
      productos,
      cargando,
      error,
      isAuthenticated,
      handleAddToCart,
      handleDeleteFromCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
