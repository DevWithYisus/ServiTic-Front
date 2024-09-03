import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import miLogo from "../../../assets/images/servitic-bg.png";
import { useFormulario } from "../../utilities/hooks/useFormulario";
import Usuario from "../../models/Usuario";
import ServicioPublico from "../../services/ServicioPublico";

import { ToastContainer, toast } from "react-toastify";

import { ContextoUsuario } from "../../security/ContextoUsuario";

import jwtDecode from "jwt-decode";
import * as cifrado from "js-sha512";
import MiSesion from "../../models/MiSesion";
import { propUsuario } from "../../models/MisInterfaces";

export const RegistroSesion = () => {

  const navigate = useNavigate();
  type formaHTML = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const { actualizar } = useContext(ContextoUsuario) as propUsuario;
  let { nombreUsuario, correoUsuario, claveUsuario, ciudadUsuario, direccionUsuario, telefonoUsuario, dobleEnlace, objeto } =
    useFormulario<Usuario>(new Usuario("", "", "", "", "", 0));

  const validarFormulario = async (fh: formaHTML) => {
    fh.preventDefault(); // Formulario no haga cosas por defecto
    setEnProceso(true); // Cambiar el estado de la variable enProceso a true
    const formulario = fh.currentTarget; // Tomar formulario actual 
    formulario.classList.add("was-validated"); // Formulario fue validado

    if (formulario.checkValidity() === false) { // Form no listo
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      // Código para crear el usuario consumiendo servicio del back y usando sha512
      // *******************************************************************
      const claveCifrada = cifrado.sha512(objeto.claveUsuario);
      objeto.claveUsuario = claveCifrada;
      const resultado = await ServicioPublico.crearUsuario(objeto);
      if (resultado.tokenMintic) {
        const objJWTRecibido: any = jwtDecode(resultado.tokenMintic);
        const usuarioCargado = new MiSesion(
          objJWTRecibido.codUsuario,
          objJWTRecibido.correo,
          objJWTRecibido.perfil
        );
        actualizar(usuarioCargado);

        localStorage.setItem("tokenMintic", resultado.tokenMintic);
        localStorage.setItem("avatarMintic", resultado.avatarMintic);
        navigate("/dashboard");
        setEnProceso(false);
      } else {
        limpiarCajas(formulario);
        mensajeError();
      }
    }
  };

  // Función flecha para resetear variables y limpiar cajas del formulario
  // *******************************************************************
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto.nombreUsuario = "";
    objeto.correoUsuario = "";
    objeto.claveUsuario = "";
    objeto.direccionUsuario = "";
    objeto.ciudadUsuario = "";
    objeto.telefonoUsuario = 0;

    formulario.nombreUsuario.value = "";
    formulario.correoUsuario.value = "";
    formulario.claveUsuario.value = "";
    formulario.direccionUsuario.value = "";
    formulario.ciudadUsuario.value = "";
    formulario.telefonoUsuario.value = 0;

    formulario.classList.remove("was-validated");
  };

  // Función flecha para presentar mensaje de error estilo toastify
  // *******************************************************************
  const mensajeError = () => {
    toast.error("No se puede crear el usuario. Correo o perfil incorrectos", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <main>
        <div className="container">
          <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <Link to="/" className="align-items-center w-auto">
                      <img src={miLogo} alt="" />
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4 text-black">
                          Registrarse
                        </h5>
                        <p className="text-center small">
                          Es fácil y rápido
                        </p>
                      </div>

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

                        <div className="col-12">
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

                        <div className="col-12">
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

                        <div className="col-12">
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

                        <div className="col-12 pt-2 pb-2">
                          <button className="btn btn-warning w-100 pt-2 pb-2"
                            type="submit">
                            Crear cuenta
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0 text-center">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login">Clic aquí</Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <ToastContainer />

      <footer className="my-5 pt-3 text-muted text-center text-small">
        <p className="mb-1">© 2022 Servitic</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a>Privacy</a></li>
          <li className="list-inline-item"><a>Terms</a></li>
          <li className="list-inline-item"><a>Support</a></li>
        </ul>
      </footer>
    </div>
  );
};