import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ContextoUsuario } from "../../../security/ContextoUsuario";

import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import Solicitud from "../../../models/Solicitud";

export const SolicitudListado = () => {

  // Variables
  const [arregloSolicitudes, setArregloSolicitudes] = useState<Solicitud[]>([]);
  const miUsuario = useContext(ContextoUsuario);
  const codigoUsuario = miUsuario?.autenticado.codUsuario
  // ************************************************************************

  // Función para obtener solicitudes
  const obtenerSolicitudes = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.SOLICITUDES_USUARIO + "/" + codigoUsuario);
    setArregloSolicitudes(resultado);
    return resultado;
  };
  // ************************************************************************

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

  return(
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Solicitudes</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Listado de solicitudes</li>
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
                  <th style={{ width: "5%" }}>Orden</th>
                  <th style={{ width: "25%" }}>Correo</th>
                  <th style={{ width: "55%" }}>Descripción</th>
                  <th className="text-center" style={{ width: "15%" }}>Tipo Solicitud</th>
                </tr>
              </thead>
              <tbody>
                {arregloSolicitudes.map((miSolicitud, contador) => (
                  <tr key={contador}>
                    <td className="text-center" >{contador+1}</td>
                    <td><small>{miSolicitud.correoUsuSolicitud}</small></td>
                    <td><small>{miSolicitud.descripSolicitud}</small></td>
                    <td className="text-center">
                      <small>{obtenerEstado(miSolicitud.tipoSolicitud)}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}
    </main>
  );
}