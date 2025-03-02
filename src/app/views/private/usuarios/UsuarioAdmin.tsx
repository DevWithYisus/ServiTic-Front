import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import Perfil from "../../../models/Perfil";
import { ToastContainer } from "react-toastify";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import {obtenerFechaLocal, obtenerHora,} from "../../../utilities/functions/FormatoFecha";
import UsuarioAdmin from "../../../models/UsuarioAdmin";


export const UsuarioAdminn = () => {
  // ************************************************************************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [objUsu, setObjUsu] = useState<UsuarioAdmin>(
    new UsuarioAdmin("", "", "", "", "", "", 0, new Date(), "", "",new Perfil("", "", 1)));
  const [arregloUsuarios, setArregloUsuarios] = useState<UsuarioAdmin[]>([]);
  // ************************************************************************

  // Eliminar perfil
  // **************************************************************************
  const borrarUsuario = async (codigoUsuario: string) => {
    const urlBorrar = ApiBack.USUARIOS_ELIMINAR + "/" + codigoUsuario;
    const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MensajeToastify("error", "No se puede eliminar el usuario.", 7000);
    } else {
      MensajeToastify(
        "success",
        "Usuario con correo: " + objUsu.correoUsuario + " ha sido eliminado",
        7000
      );
    }
    obtenerUsuarios();
  };
  // **************************************************************************

  // ************************************************************************
  const obtenerUsuarios = async () => {
    const resultado = await ServicioPrivado.peticionGET(
      ApiBack.USUARIOS_OBTENER
    );
    setArregloUsuarios(resultado);
  };
  // ************************************************************************

  // ************************************************************************
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  // ************************************************************************

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Usuarios</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Administrar usuarios</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

{/* Ejemplo de una tabla para presentación de datos: Inicio */}
<div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "10%" }}>
                    {" "}
                    Nro{" "}
                  </th>
                  <th style={{ width: "40%" }}>Usuario</th>
                  <th style={{ width: "20%" }}>Creación</th>
                  <th style={{ width: "20%" }}>Perfil</th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arregloUsuarios.map((miUsu, indice) => (
                  <tr key={indice}>
                    <td className="text-center align-middle">
                      <small>{indice + 1}</small>{" "}
                    </td>
                    <td>
                      {miUsu.nombreUsuario}
                      <br />
                      <small className="text-muted">
                        {miUsu.correoUsuario}
                      </small>
                    </td>
                    <td>
                      {obtenerFechaLocal(miUsu.fechaCreacionUsuario)}
                      <br />
                      <small className="text-muted">
                        {obtenerHora(miUsu.fechaCreacionUsuario)}
                      </small>
                    </td>
                    <td className="align-middle">
                      {miUsu.codPerfil.nombrePerfil}
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/dashboard/detailuser/" + miUsu._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjUsu(miUsu);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/dashboard/updateuser/" + miUsu._id}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ color: "#006600" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el usuario?
                <br />
                <strong>
                  {objUsu.nombreUsuario} - {objUsu.correoUsuario}
                </strong>
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
                    borrarUsuario(objUsu._id);
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

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}



    </main>
  );
};
