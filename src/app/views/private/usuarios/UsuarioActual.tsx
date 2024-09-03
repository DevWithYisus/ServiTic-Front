import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Perfil from "../../../models/Perfil";
import UsuarioAdmin from "../../../models/UsuarioAdmin";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/images/acercade.png";
import ServicioPrivado from "../../../services/ServicioPrivado";
import { useFormulario } from "../../../utilities/hooks/useFormulario";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import { ConvertirBase64 } from "../../../utilities/functions/ConvertirBase64";
import { FormSelect } from "react-bootstrap";

export const UsuarioActual = () => {
  // Variables
  let { codigo } = useParams();
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
  const [nombreimagenTempo, setNombreimagenTempo] = useState<string>("");

  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== false;

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);
  // *******************************************************************

  // Hook para formulario
  let {
    nombreUsuario,
    correoUsuario,
    ciudadUsuario,
    direccionUsuario,
    telefonoUsuario,
    nombreImagenUsuario,
    avatarUsuario,
    codPerfil,
    dobleEnlace,
    objeto,
  } = useFormulario<UsuarioAdmin>(
    new UsuarioAdmin(
      "",
      "",
      "",
      "",
      "",
      "",
      0,
      new Date(),
      "",
      "",
      new Perfil("", "", 1)
    )
  );
  // *******************************************************************

  // Consulta los datos de un usuario por su _id
  // *******************************************************************
  const obtenerUnUsuario = async () => {
    const urlCargarUnUsuario = ApiBack.USUARIOS_OBTENER_UNO + "/" + codigo;
    const usuRecibido = await ServicioPrivado.peticionGET(urlCargarUnUsuario);
    if (usuRecibido) {
      objeto.nombreUsuario = usuRecibido.nombreUsuario;
      objeto.correoUsuario = usuRecibido.correoUsuario;
      objeto.ciudadUsuario = usuRecibido.ciudadUsuario;
      objeto.direccionUsuario = usuRecibido.direccionUsuario;
      objeto.telefonoUsuario = usuRecibido.telefonoUsuario;
      // Input file es inmutable !!!. La siguiente linea no se puede habilitar
      // objeto.nombreImagenUsuario = usuRecibido.nombreImagenUsuario;
      objeto.avatarUsuario = usuRecibido.avatarUsuario;
      objeto.codPerfil = usuRecibido.codPerfil;

      if (usuRecibido) {
        setAvatarBase64(usuRecibido.avatarUsuario);
        setImagenMiniatura(usuRecibido.avatarUsuario);
        setNombreimagenTempo(usuRecibido.nombreImagenUsuario);
        setTodoListo(true);
      }
    }
  };
  // *******************************************************************

  // Obtener perfiles a mostrar en el combo
  const obtenerPerfiles = async () => {
    const resultado = await ServicioPrivado.peticionGET(
      ApiBack.PERFILES_OBTENER
    );
    setArregloPerfiles(resultado);
  };
  // ************************************************************************

  // Mostrar imagen en pantalla
  // *******************************************************************
  const mostrarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setImagenMiniatura(URL.createObjectURL(imagen));
    dobleEnlace(e);
    const base64 = await ConvertirBase64(imagen);
    setAvatarBase64(String(base64));
  };
  // ************************************************************************

  // Actualizar el perfil
  // *******************************************************************
  const enviarFormulario = async (fh: formaHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");

    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      objeto.avatarUsuario = avatarUsuario;
      objeto.avatarUsuario = avatarBase64;

      const urlActualizar = ApiBack.USUARIOS_ACTUALIZAR + "/" + codigo;
      const objetoActualizar = new UsuarioAdmin(
        objeto._id,
        objeto.nombreUsuario,
        objeto.correoUsuario,
        "",
        objeto.ciudadUsuario,
        objeto.direccionUsuario,
        objeto.telefonoUsuario,
        new Date(),
        nombreImagenUsuario !== "" ? nombreImagenUsuario : nombreimagenTempo,
        objeto.avatarUsuario,
        objeto.codPerfil
      );
      const resultado = await ServicioPrivado.peticionPUT(
        urlActualizar,
        objetoActualizar
      );

      if (resultado.nuevo) {
        setEnProceso(false);
        MensajeToastify("success", "Usuario actualizado correctamente", 7000);
      } else {
        MensajeToastify(
          "error",
          "No se puede actualizar el usuario. Verifique el correo electrónico",
          7000
        );
      }
    }
  };
  // *******************************************************************

  // Hook para cargar información una vez renderizado el componente
  useEffect(() => {
    obtenerPerfiles();
    obtenerUnUsuario();
  }, []);
  // *******************************************************************

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
            <li className="breadcrumb-item">
              <Link to="/dashboard/admprofile">Administración de usuarios</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      <div>
        <main>
          <div className="col-lg-12">
            <div className="card pt-0 align-items-center">
              <div className="card-body">
                <h4 className="card-title">
                  Formulario de creación de usuarios
                </h4>

                {cargaFinalizada ? (
                  <Form
                    noValidate
                    className="row g-3"
                    validated={enProceso}
                    onSubmit={enviarFormulario}
                  >
                    <div className="col-12">
                      <Form.Group controlId="nombreUsuario">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="nombreUsuario"
                          className="form-control"
                          value={nombreUsuario}
                          onChange={dobleEnlace}
                        />
                        <Form.Control.Feedback type="invalid">
                          Nombre es obligatorio
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="correoUsuario">
                        <Form.Label>Correo electrónico</Form.Label>
                        <div className="input-group has-validation">
                          {/* <span className="input-group-text">@</span> */}
                          <Form.Control
                            required
                            type="email"
                            name="correoUsuario"
                            className="form-control"
                            pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                            placeholder="your-email@example.com"
                            value={correoUsuario}
                            onChange={dobleEnlace}
                          />
                          <Form.Control.Feedback type="invalid">
                            correo electrónico es obligatorio
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-sm-6">
                      <Form.Group controlId="direccionUsuario">
                        <Form.Label>Dirección residencia</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="direccionUsuario"
                          className="form-control"
                          value={direccionUsuario}
                          onChange={dobleEnlace}
                        />
                        <Form.Control.Feedback type="invalid">
                          Dirección es obligatorio
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-sm-3">
                      <Form.Group controlId="ciudadUsuario">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="ciudadUsuario"
                          className="form-control"
                          value={ciudadUsuario}
                          onChange={dobleEnlace}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ciudad es obligatorio
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-sm-3">
                      <Form.Group controlId="telefonoUsuario">
                        <Form.Label>Número telefónico</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="telefonoUsuario"
                          className="form-control"
                          value={telefonoUsuario}
                          onChange={dobleEnlace}
                          minLength={10}
                          maxLength={14}
                        />
                        <Form.Control.Feedback type="invalid">
                          Telefono es obligatorio
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="codPerfil">
                        <Form.Label>Perfil</Form.Label>
                        <FormSelect
                          required
                          name="codPerfil"
                          className="form-control"
                          value={codPerfil._id}
                          onChange={dobleEnlace}
                        >
                          <option value="">Seleccione el perfil</option>
                          {arregloPerfiles.map((miPer, indice) => (
                            <option key={indice} value={miPer._id}>
                              {miPer.nombrePerfil}
                            </option>
                          ))}
                        </FormSelect>
                        <Form.Control.Feedback type="invalid">
                          Por favor escoja una opción.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="nombreImagenUsuario">
                        <Form.Label>Seleccione foto</Form.Label>
                        <Form.Control
                          accept="image/png, image/jpeg"
                          required
                          type="file"
                          name="nombreImagenUsuario"
                          className="form-control"
                          value={nombreImagenUsuario}
                          onChange={mostrarImagen}
                        />
                        <Form.Control.Feedback type="invalid">
                          Debe seleccionar un avatar para el usuario
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12 pt-2 pb-0">
                      <div className="col-sm-3"></div>
                      <div className="d-flex justify-content-center col-12">
                        <img
                          src={imagenMiniatura}
                          alt="no foto"
                          className="maximoTamanoCreacion"
                        />
                      </div>
                    </div>

                    <div className="col-12 pt-0 pb-2">
                      <hr className="my-4"></hr>
                      <button
                        className="w-100 btn btn-warning btn-lg"
                        type="submit"
                      >
                        Actualizar
                      </button>
                    </div>
                  </Form>
                ) : (
                  <div>Cargando información de los perfiles</div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">© 2022 Servitic</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a>Privacy</a>
            </li>
            <li className="list-inline-item">
              <a>Terms</a>
            </li>
            <li className="list-inline-item">
              <a>Support</a>
            </li>
          </ul>
        </footer>
      </div>
      <ToastContainer />
    </main>
  );
};
