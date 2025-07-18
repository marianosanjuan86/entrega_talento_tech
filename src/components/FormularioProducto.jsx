import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  FaBaby,
  FaDollarSign,
  FaEdit,
  FaFileAlt,
  FaImage,
  FaLayerGroup,
  FaPlus,
  FaTag,
} from "react-icons/fa";

function FormularioProducto({
  onAgregar,
  productoInicial = null,
  modoEdicion = false,
}) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    edad: "",
    stock: "",
    destacado: false,
    educativo: false,
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Cargar datos del producto si estamos en modo edición
  useEffect(() => {
    if (modoEdicion && productoInicial) {
      setProducto({
        nombre: productoInicial.nombre || "",
        precio: productoInicial.precio?.toString() || "",
        descripcion: productoInicial.descripcion || "",
        imagen: productoInicial.imagen || "",
        categoria: productoInicial.categoria || "",
        edad: productoInicial.edad || "",
        stock: productoInicial.stock?.toString() || "",
        destacado: productoInicial.destacado || false,
        educativo: productoInicial.educativo || false,
      });
    }
  }, [modoEdicion, productoInicial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      nuevosErrores.descripcion =
        "La descripción debe tener al menos 10 caracteres.";
    }

    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = "La URL de la imagen es obligatoria.";
    }

    if (!producto.categoria.trim()) {
      nuevosErrores.categoria = "La categoría es obligatoria.";
    }

    if (!producto.edad.trim()) {
      nuevosErrores.edad = "La edad recomendada es obligatoria.";
    }

    if (!producto.stock || producto.stock < 0) {
      nuevosErrores.stock = "El stock debe ser mayor o igual a 0.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    setCargando(true);
    try {
      const productoFormateado = {
        ...producto,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock),
        cantidad: modoEdicion ? productoInicial.cantidad : 0,
      };

      await onAgregar(productoFormateado);

      if (!modoEdicion) {
        setProducto({
          nombre: "",
          precio: "",
          descripcion: "",
          imagen: "",
          categoria: "",
          edad: "",
          stock: "",
          destacado: false,
          educativo: false,
        });
      }
      setErrores({});
    } catch (error) {
      console.error("Error al procesar producto:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Nombre */}
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaTag className="me-2" />
              Nombre del Producto
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              placeholder="Ej: Muñeca Barbie"
              isInvalid={!!errores.nombre}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Precio */}
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaDollarSign className="me-2" />
              Precio
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                isInvalid={!!errores.precio}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errores.precio}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Categoría */}
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaLayerGroup className="me-2" />
              Categoría
            </Form.Label>
            <Form.Select
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
              isInvalid={!!errores.categoria}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="bebés">Bebés</option>
              <option value="vehículos">Vehículos</option>
              <option value="muñecas">Muñecas</option>
              <option value="construccion">Construcción</option>
              <option value="educativos">Educativos</option>
              <option value="deportes">Deportes</option>
              <option value="peluches">Peluches</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.categoria}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Edad */}
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaBaby className="me-2" />
              Edad Recomendada
            </Form.Label>
            <Form.Control
              type="text"
              name="edad"
              value={producto.edad}
              onChange={handleChange}
              placeholder="Ej: 3-8 años"
              isInvalid={!!errores.edad}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errores.edad}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Stock */}
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              isInvalid={!!errores.stock}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errores.stock}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Imagen */}
      <Form.Group className="mb-3">
        <Form.Label>
          <FaImage className="me-2" />
          URL de la Imagen
        </Form.Label>
        <Form.Control
          type="url"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          isInvalid={!!errores.imagen}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errores.imagen}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Descripción */}
      <Form.Group className="mb-3">
        <Form.Label>
          <FaFileAlt className="me-2" />
          Descripción
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Describe las características del producto..."
          isInvalid={!!errores.descripcion}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errores.descripcion}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Checkboxes */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Check
            type="checkbox"
            name="destacado"
            label="⭐ Producto destacado"
            checked={producto.destacado}
            onChange={handleChange}
            className="fw-bold"
          />
        </Col>
        <Col md={6}>
          <Form.Check
            type="checkbox"
            name="educativo"
            label="🎓 Producto educativo"
            checked={producto.educativo}
            onChange={handleChange}
            className="fw-bold"
          />
        </Col>
      </Row>

      {/* Botón */}
      <div className="d-grid">
        <Button
          type="submit"
          variant={modoEdicion ? "success" : "primary"}
          size="lg"
          disabled={cargando}
        >
          {cargando ? (
            modoEdicion ? (
              "Actualizando producto..."
            ) : (
              "Agregando producto..."
            )
          ) : (
            <>
              {modoEdicion ? (
                <FaEdit className="me-2" />
              ) : (
                <FaPlus className="me-2" />
              )}
              {modoEdicion ? "Actualizar Producto" : "Agregar Producto"}
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}

export default FormularioProducto;
