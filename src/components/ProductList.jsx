import React, { useState } from "react";
import Productos from "./Productos";

const ProductList = ({ productos = [], agregarCarrito }) => {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroEdad, setFiltroEdad] = useState("todos");
  const [soloEducativos, setSoloEducativos] = useState(false);
  const [soloDestacados, setSoloDestacados] = useState(false);

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  const edades = [...new Set(productos.map((p) => p.edad))];

  const productosFiltrados = productos.filter((producto) => {
    const pasaCategoria =
      filtroCategoria === "todos" || producto.categoria === filtroCategoria;
    const pasaEdad = filtroEdad === "todos" || producto.edad === filtroEdad;
    const pasaEducativo = !soloEducativos || producto.educativo;
    const pasaDestacado = !soloDestacados || producto.destacado;

    return pasaCategoria && pasaEdad && pasaEducativo && pasaDestacado;
  });

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "15px",
          marginBottom: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          🔍 Encuentra el juguete perfecto
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            alignItems: "end",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              🎯 Categoría:
            </label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
                fontSize: "1rem",
                backgroundColor: "white",
                color: "#333",
                cursor: "pointer",
              }}
            >
              <option value="todos">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              👶 Edad:
            </label>
            <select
              value={filtroEdad}
              onChange={(e) => setFiltroEdad(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
                fontSize: "1rem",
                backgroundColor: "white",
                color: "#333",
                cursor: "pointer",
              }}
            >
              <option value="todos">Todas las edades</option>
              {edades.map((edad) => (
                <option key={edad} value={edad}>
                  {edad}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={soloEducativos}
                onChange={(e) => setSoloEducativos(e.target.checked)}
                style={{ marginRight: "8px", transform: "scale(1.2)" }}
              />
              🎓 Solo educativos
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              <input
                type="checkbox"
                checked={soloDestacados}
                onChange={(e) => setSoloDestacados(e.target.checked)}
                style={{ marginRight: "8px", transform: "scale(1.2)" }}
              />
              ⭐ Solo destacados
            </label>
          </div>

          <div>
            <button
              onClick={() => {
                setFiltroCategoria("todos");
                setFiltroEdad("todos");
                setSoloEducativos(false);
                setSoloDestacados(false);
              }}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              🔄 Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        {productosFiltrados.length === 0 ? (
          <p
            style={{
              padding: "2rem",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              color: "#856404",
            }}
          >
            😔 No encontramos juguetes con esos filtros. ¡Prueba con otros
            criterios!
          </p>
        ) : (
          <p>
            🎉 Encontramos <strong>{productosFiltrados.length}</strong> juguete
            {productosFiltrados.length !== 1 ? "s" : ""} perfecto
            {productosFiltrados.length !== 1 ? "s" : ""} para ti
          </p>
        )}
      </div>

      {/* Grid de productos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        {productosFiltrados.map((producto) => (
          <Productos
            key={producto.id}
            producto={producto}
            agregarCarrito={agregarCarrito}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
