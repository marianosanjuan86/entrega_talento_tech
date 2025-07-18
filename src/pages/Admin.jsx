import React, { useContext, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/estaticos/Footer";
import Header from "../components/estaticos/Header";
import FormularioProducto from "../components/FormularioProducto";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Admin = () => {
  const { logout, user } = useContext(AuthContext);
  const {
    productos,
    cargando,
    error,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
  } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAgregarProducto = async (producto) => {
    const result = await agregarProducto(producto);
    if (result.success) {
      setShowModal(false);
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoAEditar(producto);
    setShowEditModal(true);
  };

  const handleActualizarProducto = async (productoActualizado) => {
    const result = await actualizarProducto(
      productoAEditar.id,
      productoActualizado
    );
    if (result.success) {
      setShowEditModal(false);
      setProductoAEditar(null);
    }
  };

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setShowDeleteModal(true);
  };

  const handleEliminarProducto = async () => {
    if (productoAEliminar) {
      await eliminarProducto(productoAEliminar.id);
      setShowDeleteModal(false);
      setProductoAEliminar(null);
    }
  };

  if (cargando) {
    return (
      <>
        <Header />
        <Container className="mt-5 text-center" style={{ minHeight: "70vh" }}>
          <Spinner animation="border" role="status" size="lg" />
          <p className="mt-3">Cargando productos...</p>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container className="mt-5" style={{ minHeight: "70vh" }}>
          <Alert variant="danger" className="text-center">
            <h4>Error al cargar productos</h4>
            <p>Por favor, intenta nuevamente más tarde.</p>
          </Alert>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4" style={{ minHeight: "70vh" }}>
        {/* Header del Admin */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col>
                    <h2 className="mb-0">
                      <FaUserTie className="me-2 text-primary" />
                      Panel Administrativo
                    </h2>
                    <p className="text-muted mb-0">
                      Bienvenido, {user?.name || "Administrador"}
                    </p>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      className="me-2"
                    >
                      <FaSignOutAlt className="me-2" />
                      Cerrar Sesión
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(true)}
                    >
                      <FaPlus className="me-2" />
                      Agregar Producto
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Estadísticas */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-primary">{productos.length}</h3>
                <p className="text-muted mb-0">Total Productos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-success">
                  {productos.filter((p) => p.stock > 0).length}
                </h3>
                <p className="text-muted mb-0">En Stock</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-warning">
                  {productos.filter((p) => p.destacado).length}
                </h3>
                <p className="text-muted mb-0">Destacados</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabla de productos */}
        <Card className="shadow-sm">
          <Card.Header>
            <h5 className="mb-0">Gestión de Productos</h5>
          </Card.Header>
          <Card.Body>
            {productos.length === 0 ? (
              <Alert variant="info" className="text-center">
                <h5>No hay productos registrados</h5>
                <p>Comienza agregando tu primer producto</p>
              </Alert>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <strong>{producto.nombre}</strong>
                        <br />
                        <small className="text-muted">{producto.edad}</small>
                      </td>
                      <td>
                        <strong className="text-primary">
                          ${producto.precio}
                        </strong>
                      </td>
                      <td>
                        <Badge bg={producto.stock > 5 ? "success" : "warning"}>
                          {producto.stock}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg="secondary">{producto.categoria}</Badge>
                      </td>
                      <td>
                        {producto.destacado && (
                          <Badge bg="danger" className="me-1">
                            Destacado
                          </Badge>
                        )}
                        {producto.educativo && (
                          <Badge bg="success">Educativo</Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditarProducto(producto)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => confirmarEliminacion(producto)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Modal para agregar producto */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormularioProducto onAgregar={handleAgregarProducto} />
          </Modal.Body>
        </Modal>

        {/* Modal para editar producto */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormularioProducto
              onAgregar={handleActualizarProducto}
              productoInicial={productoAEditar}
              modoEdicion={true}
            />
          </Modal.Body>
        </Modal>

        {/* Modal de confirmación para eliminar */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que quieres eliminar este producto?</p>
            {productoAEliminar && (
              <Alert variant="warning">
                <strong>{productoAEliminar.nombre}</strong>
                <br />
                Esta acción no se puede deshacer.
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleEliminarProducto}>
              <FaTrash className="me-2" />
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
