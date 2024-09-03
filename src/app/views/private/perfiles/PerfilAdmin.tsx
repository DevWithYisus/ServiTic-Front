import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import Perfil from "../../../models/Perfil";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";


export const PerfilAdmin = () => {

  // Variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);
  const [objPer, setObjPer] = useState<Perfil>(new Perfil("", "", 0));
  // ************************************************************************

  // Función para listar perfiles
  const obtenerPerfiles = async () => {
    const resultado = await ServicioPrivado.peticionGET( ApiBack.PERFILES_OBTENER ); setArregloPerfiles(resultado);
    return resultado;
  };
  // ************************************************************************
  
  // Eliminar perfil
  // **************************************************************************
  const borrarPerfil = async (codigoPerfil: string) => {
    const urlBorrar = ApiBack.PERFILES_ELIMINAR + "/" + codigoPerfil;
    const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MensajeToastify("error", "No se puede eliminar el perfil. Es posible que esté relacionado con usuarios", 6000);
    } else {
      MensajeToastify("success", "Perfil eliminado de la base de datos", 6000);
    }
    obtenerPerfiles();
  };
  // **************************************************************************
  
  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    obtenerPerfiles();
  }, []);
  // ************************************************************************
  
  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Perfiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              Administración de perfiles
            </li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejempplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Orden</th>
                  <th style={{ width: "50%" }}>Nombre perfil</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "10%" }}>Usuarios</th>
                  <th className="text-center" style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arregloPerfiles.map((miPerfil, contador) => (
                  <tr key={contador}>
                    <td>{contador+1}</td>
                    <td>{miPerfil.nombrePerfil}</td>
                    <td>{miPerfil.estadoPerfil === 1? "Activo": "Inactivo"}</td>
                    <td className="text-center">{miPerfil.cantUsuarios}</td>
                    <td>
                      <a href="/#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setObjPer(miPerfil);
                        setShow(true);
                      }}>
                        <i className="fa-solid fa-trash-can" style={{color: "red"}}></i>
                      </a>
                      {" "}
                      <Link to={"/dashboard/updateprofile/" + miPerfil._id}>
                        <i className="fa-solid fa-pen-to-square" style={{color: "green"}}></i>
                      </Link> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Ejemplo de Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar perfil</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eliminar el perfil:{" "}
                <strong>{objPer.nombrePerfil}</strong>?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    borrarPerfil(objPer._id);
                    setShow(false);
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
            {/* *********************************************************************************/}
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}
      <ToastContainer />
    </main>
  );
}