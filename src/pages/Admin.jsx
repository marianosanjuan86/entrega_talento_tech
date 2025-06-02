import React, { useEffect, useState } from "react";
import FormularioProducto from "../components/FormularioProducto";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "" });
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProductos(data);
          setLoader(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoader(false);
      });
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(
        "https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al agregar producto");
      }
      const data = await respuesta.json();
      alert("Producto agregado correctamente");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {loader ? (
        <p>Cargando...</p>
      ) : (
        <>
          <nav>
            <ul className="nav">
              <li className="navItem">
                <button className="navButton">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
              <li className="navItem">
                <a href="/admin">Admin</a>
              </li>
            </ul>
          </nav>
          <h1 className="title">Panel Administrativo</h1>

          <ul className="list">
            {productos.map((product) => (
              <li key={product.id} className="listItem">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="listItemImage"
                />
                <span>{product.nombre}</span>
                <span>${product.precio}</span>
                <div>
                  <button className="editButton">Editar</button>

                  <button className="deleteButton">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={() => setOpen(true)}>Agregar producto nuevo</button>
      {open && <FormularioProducto onAgregar={agregarProducto} />}
    </div>
  );
};

export default Admin;
