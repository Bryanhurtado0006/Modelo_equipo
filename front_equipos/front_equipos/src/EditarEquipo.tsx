import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";

interface Presidente {
  dni: number;
  nombre: string;
}

interface Equipo {
  codigo: number;
  nombre: string;
  anio_fundacion: number;
  presidente: Presidente;
}

const EditarEquipo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { codigo, dni_presidente } = location.state as { codigo: number; dni_presidente: number };

  const [nombre, setNombre] = useState("");
  const [anioFundacion, setAnioFundacion] = useState(0);
  const [nombrePresidente, setNombrePresidente] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(`http://localhost:3333/equiposs/${codigo}`);
        const data = await response.json();
        if (response.ok) { setNombre(data.mensaje.nombre);
          setAnioFundacion(data.mensaje.anio_fundacion);
          setNombrePresidente(data.mensaje.presidente.nombre);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
  }, [codigo]);

  const guardarCambios = async () => {
    if (!nombre || !anioFundacion || !nombrePresidente) {
      setMensaje("Todos los campos deben estar completos.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/equiposs/${codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          anio_fundacion: anioFundacion,
          presidente: { dni: dni_presidente, nombre: nombrePresidente },
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
      if (response.ok) {
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setMensaje("Error al actualizar el equipo");
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
     <Row className="justify-content-md-center">
        <Col md={8}>      
        <Card className="shadow-sm">
      <Card.Header className="bg-success text-white"> <h2 className="mb-0">Editar Equipo</h2> </Card.Header>
            <Card.Body>
              <Form>
                {/* Sección Equipo */}
                <Card className="mb-4 border-success">
                  <Card.Body>
<Form.Group className="mb-3">
<Form.Label className="text-success fw-bold">Código</Form.Label>
<Form.Control readOnly value={codigo} className="bg-light" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-success fw-bold">Nombre del Equipo</Form.Label>
                      <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border-success"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
<Form.Label className="text-success fw-bold">Año de Fundación</Form.Label>
                      <Form.Control
type="number"
                        value={anioFundacion}
                        onChange={(e) => setAnioFundacion(Number(e.target.value))}
                        className="border-success"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Sección Presidente */}
                <Card className="mb-4 border-success">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">Datos del Presidente</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-success fw-bold">DNI</Form.Label>
                      <Form.Control readOnly value={dni_presidente} className="bg-light" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-success fw-bold">Nombre del Presidente</Form.Label>
                      <Form.Control
                        type="text"
                        value={nombrePresidente}
                        onChange={(e) => setNombrePresidente(e.target.value)}
                        className="border-success"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Botones */}
                <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-success" onClick={() => navigate("/")} className="px-4">
                    Cancelar
                  </Button>
                  <Button variant="success" onClick={guardarCambios} className="px-4">
                    Guardar Cambios
                  </Button>
                </div>

                {/* Mensaje */}
                {mensaje && (
                  <Alert variant={mensaje.toLowerCase().includes("éxito") ? "success" : "danger"} className="mt-4" >
                    {mensaje} </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditarEquipo;
