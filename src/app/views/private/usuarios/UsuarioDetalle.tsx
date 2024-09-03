import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Usuario from "../../../models/Usuario";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/images/acercade.png";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { obtenerFechaLocal, obtenerHora, } from "../../../utilities/functions/FormatoFecha";
import UsuarioAdmin from "../../../models/UsuarioAdmin";


export const UsuarioDetalle = () => {
  let { codigo } = useParams();
  const regresar = useNavigate();
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  const [objUsuario, setObjUsuario] = useState<UsuarioAdmin>();

  useEffect(() => {
    // Consulta los datos de un usuario por su _id
    // *******************************************************************
    const obtenerUnUsuario = async () => {
      const urlCargarUnUsuario = ApiBack.USUARIOS_OBTENER_UNO + "/" + codigo;
      const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUnUsuario);
      if (usuRecibido) {
        setObjUsuario(usuRecibido);
        setTodoListo(true);
      }
    };
    // *******************************************************************
    obtenerUnUsuario();
  }, [codigo]);

  return (
    <main id="main" className="main">
      {cargaFinalizada ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Información del usuario</div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title text-center pt-2">
                    {objUsuario?.nombreUsuario}
                  </h5>
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = noFoto;
                    }}
                    src={objUsuario?.avatarUsuario}
                    alt="Profile"
                    className="maximoTamanoCreacion "
                  />
                </div>
                <p className="card-text pt-4">
                  Correo: {objUsuario?.correoUsuario}
                  <br />
                  Perfil: {objUsuario?.codPerfil.nombrePerfil}
                  <br />
                  Ciudad: {objUsuario?.ciudadUsuario}
                  <br />
                  Dirección: {objUsuario?.direccionUsuario}
                  <br />
                  Telefono: {objUsuario?.telefonoUsuario}
                  <br />
                  Fecha creación:{" "}
                  {obtenerFechaLocal(String(objUsuario?.fechaCreacionUsuario))}
                  <br />
                  Hora creación:{" "}
                  {obtenerHora(String(objUsuario?.fechaCreacionUsuario))}
                  <br />
                  Nombre avatar: {objUsuario?.nombreImagenUsuario}
                  <br />
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => regresar(-1)}
                  className="w-100 btn btn-warning" type="submit">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Carga de usuario en proceso</div>
      )}
    </main>
  );
};