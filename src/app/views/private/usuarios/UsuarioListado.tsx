import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ApiBack from "../../../utilities/domains/ApiBack";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { obtenerFechaLocal, obtenerHora, } from "../../../utilities/functions/FormatoFecha";
import UsuarioAdmin from "../../../models/UsuarioAdmin";

export const UsuarioListado = () => {
  
  // ************************************************************************
  const [arregloUsuarios, setArregloUsuarios] = useState<UsuarioAdmin[]>([]);
  // ************************************************************************

  // ************************************************************************
  const obtenerUsuarios = async () => {
    const resultado = await ServicioPrivado.peticionGET( ApiBack.USUARIOS_OBTENER );
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
            <li className="breadcrumb-item active">Listado de usuarios</li>
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
                  <th className="text-center" style={{ width: "10%" }}> Nro </th>
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
                      <Link to={"/dashboard/detailuser/"+miUsu._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>
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