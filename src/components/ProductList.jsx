import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import Productos from "./Productos";

const ProductList = () => {
  const { currentProducts, handleAddToCart, productos } =
    useContext(CartContext);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroEdad, setFiltroEdad] = useState("todos");
  const [soloEducativos, setSoloEducativos] = useState(false);
  const [soloDestacados, setSoloDestacados] = useState(false);

  // Usar productos como fallback si currentProducts no existe
  const productosAUsar = currentProducts || productos || [];

  // Obtener categorías y edades únicas
  const categorias = [...new Set(productosAUsar.map((p) => p.categoria))];
  const edades = [...new Set(productosAUsar.map((p) => p.edad))];

  // Aplicar filtros adicionales a los productos ya filtrados por búsqueda
  const productosFiltrados = productosAUsar.filter((producto) => {
    const pasaCategoria =
      filtroCategoria === "todos" || producto.categoria === filtroCategoria;
    const pasaEdad = filtroEdad === "todos" || producto.edad === filtroEdad;
    const pasaEducativo = !soloEducativos || producto.educativo;
    const pasaDestacado = !soloDestacados || producto.destacado;

    return pasaCategoria && pasaEdad && pasaEducativo && pasaDestacado;
  });

  const limpiarFiltros = () => {
    setFiltroCategoria("todos");
    setFiltroEdad("todos");
    setSoloEducativos(false);
    setSoloDestacados(false);
  };

  if (!productosAUsar || productosAUsar.length === 0) {
    return (
      <Container className="text-center py-5">
        <h4 className="text-muted">No se encontraron productos</h4>
        <p className="text-muted">Intenta con otros términos de búsqueda</p>
      </Container>
    );
  }

  return (
    <div>
      {/* Panel de filtros */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0 text-center">
            <FaFilter className="me-2" />
            🔍 Encuentra el juguete perfecto
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3 align-items-end">
            {/* Filtro por categoría */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="fw-bold text-muted">
                🎯 Categoría:
              </Form.Label>
              <Form.Select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="shadow-sm"
              >
                <option value="todos">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Filtro por edad */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="fw-bold text-muted">👶 Edad:</Form.Label>
              <Form.Select
                value={filtroEdad}
                onChange={(e) => setFiltroEdad(e.target.value)}
                className="shadow-sm"
              >
                <option value="todos">Todas las edades</option>
                {edades.map((edad) => (
                  <option key={edad} value={edad}>
                    {edad}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Checkboxes */}
            <Col xs={12} sm={6} md={3}>
              <Form.Check
                type="checkbox"
                id="educativos"
                label="🎓 Solo educativos"
                checked={soloEducativos}
                onChange={(e) => setSoloEducativos(e.target.checked)}
                className="fw-bold text-muted mb-2"
              />
              <Form.Check
                type="checkbox"
                id="destacados"
                label="⭐ Solo destacados"
                checked={soloDestacados}
                onChange={(e) => setSoloDestacados(e.target.checked)}
                className="fw-bold text-muted"
              />
            </Col>

            {/* Botón limpiar */}
            <Col xs={12} sm={6} md={3}>
              <Button
                variant="secondary"
                onClick={limpiarFiltros}
                className="w-100"
              >
                🔄 Limpiar filtros
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Contador de resultados */}
      <div className="text-center mb-4">
        {productosFiltrados.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            😔 No encontramos juguetes con esos filtros. ¡Prueba con otros
            criterios!
          </div>
        ) : (
          <p className="text-muted">
            🎉 Encontramos <strong>{productosFiltrados.length}</strong> juguete
            {productosFiltrados.length !== 1 ? "s" : ""} perfecto
            {productosFiltrados.length !== 1 ? "s" : ""} para ti
          </p>
        )}
      </div>

      {/* Grid de productos usando tu componente Productos */}
      <Row className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <Productos producto={producto} agregarCarrito={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
