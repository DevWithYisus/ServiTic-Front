import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import Solicitud from "../../../models/Solicitud";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import { Button, Modal } from "react-bootstrap";
import {
  obtenerFechaLocal,
  obtenerHora,
} from "../../../utilities/functions/FormatoFecha";

export const SolicitudAdmin = () => {
  // Variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [objSoli, setObjSoli] = useState<Solicitud>(
    new Solicitud("", 0, "", "", new Date())
  );
  const [arregloSolicitudes, setArregloSolicitudes] = useState<Solicitud[]>([]);
  // ************************************************************************
  const borrarPeticion = async (codigoPeticion: string) => {
    const urlBorrar = ApiBack.SOLICITUDES_ELIMINAR + "/" + codigoPeticion;
    const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MensajeToastify("error", "No se puede eliminar la peticion.", 7000);
    } else {
      MensajeToastify(
        "success",
        "Peticion eliminada " + objSoli._id + " ha sido eliminado",
        7000
      );
    }
    obtenerSolicitudes();
  };

  // Función para obtener solicitudes
  const obtenerSolicitudes = async () => {
    const resultado = await ServicioPrivado.peticionGET(
      ApiBack.SOLICITUDES_OBTENER
    );
    setArregloSolicitudes(resultado);
    return resultado;
  };

  const obtenerEstado = (valor: number) => {
    let textoEstado = "";
    switch (valor) {
      case 1:
        textoEstado = "Petición";
        break;

      case 2:
        textoEstado = "Queja";
        break;
      case 3:
        textoEstado = "Reclamo";
        break;
      case 4:
        textoEstado = "Sugerencia";
        break;
    }
    return textoEstado;
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);
  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Solicitudes</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Administrar solicitudes</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>Orden</th>
                  <th style={{ width: "18%" }}>Correo</th>
                  <th style={{ width: "15%" }}>Fecha</th>
                  <th style={{ width: "25%" }}>Descripción
                  </th>
                  <th style={{ width: "25%" }}>Tipo de solicitud</th>
                </tr>
              </thead>
              <tbody>
                {arregloSolicitudes.map((miSolicitud, contador) => (
                  <tr key={contador}>
                    <td className="text-center">{contador + 1}</td>
                    <td>
                      <small>{miSolicitud.correoUsuSolicitud}</small>
                    </td>
                    <td>
                      {obtenerFechaLocal(miSolicitud.fechaSolicitud)}
                      <br />
                      <small className="text-muted">
                        {obtenerHora(miSolicitud.fechaSolicitud)}
                      </small>
                    </td>
                    <td>
                      <small>{miSolicitud.descripSolicitud}</small>
                    </td>
                    <td>
                      <small>{obtenerEstado(miSolicitud.tipoSolicitud)}</small>
                    </td>
                    <td className="text-center align-middle">
                        <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjSoli(miSolicitud);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/dashboard/updatepqr/" + miSolicitud._id}>
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
                <Modal.Title>Eliminar Peticion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar La peticion?
                <br />
                <strong>{objSoli._id}</strong>
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
                    borrarPeticion(objSoli._id);
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
    </main>
  );
};
