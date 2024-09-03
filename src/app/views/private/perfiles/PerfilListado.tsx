import { useState, useEffect } from "react";

import Perfil from "../../../models/Perfil";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { Link } from "react-router-dom";

export const PerfilListado = () => {

  // Variables
  const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);
  // ************************************************************************

  // Función para obtener perfiles
  const obtenerPerfiles = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.PERFILES_OBTENER);
    setArregloPerfiles(resultado);
    return resultado;
  };
  // ************************************************************************

  useEffect(() => {
    obtenerPerfiles();
  }, []);

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
            <li className="breadcrumb-item active">Listado de perfiles</li>
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
                  <th style={{ width: "20%" }}>Orden</th>
                  <th style={{ width: "50%" }}>Nombre perfil</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "15%" }}>Usuarios</th>
                </tr>
              </thead>
              <tbody>
                {arregloPerfiles.map((miPerfil, contador) => (
                  <tr key={contador}>
                    <td>{contador+1}</td>
                    <td>{miPerfil.nombrePerfil}</td>
                    <td>{miPerfil.estadoPerfil === 1? "Activo": "Inactivo"}</td>
                    <td className="text-center">{miPerfil.cantUsuarios}</td>
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