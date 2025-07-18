import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

const API_URL = "https://68100d9d27f2fdac24102122.mockapi.io/api/v1/productos";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const fetchProductos = useCallback(async () => {
    try {
      setCargando(true);
      setError(false);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Error al obtener productos de MockAPI");
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError(true);
      toast.error("Error al cargar los productos desde MockAPI");
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  }, []);

  const agregarProducto = useCallback(async (producto) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error("Error al agregar producto");
      }

      const nuevoProducto = await response.json();
      setProductos((prev) => [...prev, nuevoProducto]);
      toast.success("Producto agregado exitosamente! 🎉");
      return { success: true, producto: nuevoProducto };
    } catch (error) {
      toast.error("Error al agregar producto");
      console.error("Error al agregar producto:", error);
      return { success: false, error: "Error al agregar producto" };
    }
  }, []);

  const actualizarProducto = useCallback(async (id, producto) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar producto");
      }

      const productoActualizado = await response.json();
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? productoActualizado : p))
      );
      toast.success("Producto actualizado exitosamente! ✅");
      return { success: true, producto: productoActualizado };
    } catch (error) {
      toast.error("Error al actualizar producto");
      console.error("Error al actualizar producto:", error);
      return { success: false, error: "Error al actualizar producto" };
    }
  }, []);

  const eliminarProducto = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }

      setProductos((prev) => prev.filter((p) => p.id !== id));
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.success("Producto eliminado exitosamente! 🗑️");
      return { success: true };
    } catch (error) {
      toast.error("Error al eliminar producto");
      console.error("Error al eliminar producto:", error);
      return { success: false, error: "Error al eliminar producto" };
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const handleAddToCart = useCallback(
    (product, showToast = true) => {
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

      if (showToast) {
        toast.success(`${product.nombre} agregado al carrito! 🛒`);
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

  const vaciarCarrito = useCallback(() => {
    setCart([]);
    toast.info("Carrito vaciado");
  }, []);

  const productosFiltrados = useMemo(() => {
    if (!searchTerm) return productos;
    return productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);

  const contextValue = useMemo(
    () => ({
      cart,
      productos,
      cargando,
      error,
      searchTerm,
      currentPage,
      currentProducts,
      totalPages,
      handleAddToCart,
      handleDeleteFromCart,
      vaciarCarrito,
      setSearchTerm,
      setCurrentPage,
      fetchProductos,
      agregarProducto,
      actualizarProducto,
      eliminarProducto,
    }),
    [
      cart,
      productos,
      cargando,
      error,
      searchTerm,
      currentPage,
      currentProducts,
      totalPages,
      handleAddToCart,
      handleDeleteFromCart,
      vaciarCarrito,
      fetchProductos,
      agregarProducto,
      actualizarProducto,
      eliminarProducto,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
