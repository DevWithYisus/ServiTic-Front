import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useFormulario } from "../../../utilities/hooks/useFormulario";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Perfil from "../../../models/Perfil";
import { Link, useNavigate } from "react-router-dom";
import ServicioPrivado from "../../../services/ServicioPrivado";
import ApiBack from "../../../utilities/domains/ApiBack";
import { ConvertirBase64 } from "../../../utilities/functions/ConvertirBase64";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import noFoto from "../../../../assets/images/acercade.png";
import UsuarioAdmin from "../../../models/UsuarioAdmin";
import * as cifrado from "js-sha512";
import { ToastContainer } from "react-toastify";

export const UsuarioCrear = () => {

  // Variables
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== false;

  const redirigir = useNavigate();
  const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  type formaHTML = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [arregloPerfiles, setArregloPerfiles] = useState<Perfil[]>([]);
  // *******************************************************************

  // Hook para formulario
  let { nombreUsuario, correoUsuario, claveUsuario, ciudadUsuario, direccionUsuario, telefonoUsuario, nombreImagenUsuario, avatarUsuario, codPerfil, dobleEnlace, objeto } =
    useFormulario<UsuarioAdmin>(new UsuarioAdmin("", "", "", "", "", "", 0, new Date(), "", "", new Perfil("", "", 1)));
  // *******************************************************************

  // Obtener perfiles a mostrar en el combo
  const obtenerPerfiles = async () => {
    const resultado = await ServicioPrivado.peticionGET(ApiBack.PERFILES_OBTENER);
    setArregloPerfiles(resultado);
    if (resultado) { setTodoListo(true); }
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

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    objeto._id = "";
    objeto.claveUsuario = "";
    formulario.claveUsuario.value = "";
    formulario.reClaveUsuario.value = "";
    formulario.classList.remove("was-validated");
  };


  const validarFormulario = async (fh: formaHTML) => {
    fh.preventDefault(); // Formulario no haga cosas por defecto
    setEnProceso(true); // Cambiar el estado de la variable enProceso a true
    const formulario = fh.currentTarget; // Tomar formulario actual 
    formulario.classList.add("was-validated"); // Formulario fue validado

    if (formulario.checkValidity() === false) { // Form no listo
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const claveCifrada = cifrado.sha512(objeto.claveUsuario);
      objeto.claveUsuario = claveCifrada;
      objeto.avatarUsuario = avatarBase64;
      const resultado = await ServicioPrivado.peticionPOST(ApiBack.USUARIOS_CREAR, objeto);

      if (resultado.id) {
        setEnProceso(false);
        redirigir("/dashboard/detailuser/" + resultado.id);
      } else {
        limpiarCajas(formulario);
        MensajeToastify("error", "No se puede crear el usuario. Es posible que el correo exista en la BD", 7000);
      }
    }
  };

  // Hook que carga información al renderizar la página
  useEffect(() => {
    obtenerPerfiles();
  }, []);
  // *******************************************************************

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
            <li className="breadcrumb-item active">Crear usuario</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      <div>
        <main>
          <div className="col-lg-12">
            <div className="card pt-0 align-items-center">
              <div className="card-body">
                <h4 className="card-title">Formulario de creación de usuarios</h4>

                {cargaFinalizada?(
                  <Form noValidate className="row g-3"
                  validated={enProceso}
                  onSubmit={validarFormulario}
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
                    <Form.Group controlId="claveUsuario">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="claveUsuario"
                        className="form-control"
                        minLength={5}
                        value={claveUsuario}
                        onChange={dobleEnlace}
                      />
                      <Form.Control.Feedback type="invalid">
                        Mínimo 5 caracteres
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-sm-6">
                    <Form.Group controlId="reClaveUsuario">
                      <Form.Label>Confirmar contraseña</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        name="reClaveUsuario"
                        className="form-control"
                        pattern={claveUsuario}
                      />
                      <Form.Control.Feedback type="invalid">
                        Contraseñas no coindicen
                      </Form.Control.Feedback>
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
                    <button className="w-100 btn btn-warning btn-lg" type="submit">
                      Registrar
                    </button>
                  </div>
                </Form>
                ):(<div>Cargando información de los perfiles</div>)}              
              </div>
            </div>
          </div>
        </main>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">© 2022 Servitic</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a>Privacy</a></li>
            <li className="list-inline-item"><a>Terms</a></li>
            <li className="list-inline-item"><a>Support</a></li>
          </ul>
        </footer>
      </div>
      <ToastContainer />
    </main>
  );
}