import { useContext, useEffect, useState } from "react";
import { Button, Card, Nav } from "react-bootstrap";
import Perfil from "../models/Perfil";
import Solicitud from "../models/Solicitud";
import UsuarioAdmin from "../models/UsuarioAdmin";
import { ContextoUsuario } from "../security/ContextoUsuario";
import ServicioPrivado from "../services/ServicioPrivado";
import ApiBack from "../utilities/domains/ApiBack";

export const Bienvenida = () => {

  // Variables
  const [arregloSolicitudes, setArregloSolicitudes] = useState<Solicitud[]>([]);
  const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);
  const [arregloUsuarios, setArregloUsuarios] = useState<UsuarioAdmin[]>([]);
  const miUsuario = useContext(ContextoUsuario);
  const codigoUsuario = miUsuario?.autenticado.codUsuario

  // ************************************************************************

  // Función para obtener solicitudes
  const obtenerSolicitudes = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.SOLICITUDES_OBTENER);
    setArregloSolicitudes(resultado);
    return resultado;
  };
  // ************************************************************************

  // Función para obtener perfiles
  const obtenerPerfiles = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.PERFILES_OBTENER);
    setArregloPerfiles(resultado);
    return resultado;
  };
  // ************************************************************************

  // Función para obtener perfiles
  const obtenerUsuarios = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.USUARIOS_OBTENER);
    setArregloUsuarios(resultado);
    return resultado;
  };
  // ************************************************************************

  useEffect(() => {
    obtenerSolicitudes();
    obtenerPerfiles();
    obtenerUsuarios();
  }, []);

  return (
    <main id="main" className="main">
      <div className="col-lg-11 mx-auto p-4 py-md-5">
        <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
          <i
            className="fs-2 bi bi-boxes text-warning"
            style={{ paddingRight: "5px" }}
          ></i>
          <span className="fs-3">Bienvenido a Servitic</span>
        </header>

        <main>

          <div className="row g-5">
            <div className="col-md-3">
              <h2>Perfiles</h2>
              <Card border="warning">
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>{arregloPerfiles.length.toString()} </h2>
                    <i className="fs-1 bi bi-person-badge-fill text-warning" />
                  </Card.Title>
                  <Card.Text className="col-12 pt-0 pb-2">
                    <button className="w-100 btn btn-warning" type="submit">
                      Ver
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>

            <div className="col-md-3">
              <h2>Usuarios</h2>
              <Card border="warning" >
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>{arregloUsuarios.length.toString()} </h2>
                    <i className="fs-1 bi bi-people-fill text-warning" />
                  </Card.Title>
                  <Card.Text className="col-12 pt-0 pb-2">
                    <button className="w-100 btn btn-warning" type="submit">
                      Ver
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>

            <div className="col-md-3">
              <h2>Solicitudes</h2>
              <Card border="warning">
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2>{arregloSolicitudes.length.toString()} </h2>
                    <i className="fs-1 bi bi-file-text-fill text-warning" />
                  </Card.Title>
                  <Card.Text className="col-12 pt-0 pb-2">
                    <button className="w-100 btn btn-warning" type="submit">
                      Ver
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>

            <div className="col-md-3">
              <h2>Compras</h2>
              <Card border="warning">
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2> 10 </h2>
                    <i className="fs-1 bi bi-cart-fill text-warning" />
                  </Card.Title>
                  <Card.Text className="col-12 pt-0 pb-2">
                    <button className="w-100 btn btn-warning" type="submit">
                      Ver
                    </button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};