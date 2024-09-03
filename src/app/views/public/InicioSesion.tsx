import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import * as cifrado from "js-sha512";

import MiSesion from "../../models/MiSesion";
import Usuario from "../../models/Usuario";
import { propUsuario } from "../../models/MisInterfaces";
import miLogo from "../../../assets/images/servitic-bg.png";
import ServicioPublico from "../../services/ServicioPublico";
import { ContextoUsuario } from "../../security/ContextoUsuario";
import { useFormulario } from "../../utilities/hooks/useFormulario";

import { ToastContainer, toast } from "react-toastify";
import { MensajeToastify } from "../../utilities/functions/MensajeToastify";

export const InicioSesion = () => {

  // Definición de variables
  // *******************************************************************
  const navigate = useNavigate();
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const { actualizar } = useContext(ContextoUsuario) as propUsuario;

  // Formulario con hooks
  // *******************************************************************
  let { correoUsuario, claveUsuario, dobleEnlace, objeto } = useFormulario<Usuario>(new Usuario("", "", "","", "", 0));

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto.correoUsuario = "";
    objeto.claveUsuario = "";

    formulario.correoUsuario.value = "";
    formulario.claveUsuario.value = "";

    formulario.classList.remove("was-validated");
  };

  // Iniciar sesión
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
      const claveCifrada = cifrado.sha512(objeto.claveUsuario);
      objeto.claveUsuario = claveCifrada;
      const resultado = await ServicioPublico.iniciarSesion(objeto);

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
        MensajeToastify("error", "Las credenciales son incorrectas", 8000);
      }
    }
  };

  return (
    <div style={{backgroundColor: "#f0f2f5"}}>
      <main>
        <div className="container">
          <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link to="/" className="align-items-center w-auto">
                    <img src={miLogo} alt=""/>
                  </Link>
                </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4 text-black">
                          Inicio de sesión
                        </h5>
                      </div>

                      <Form
                        noValidate
                        validated={enProceso}
                        onSubmit={enviarFormulario}
                        className="row g-3"
                      >
                        <div className="col-12">
                          <Form.Group controlId="correoUsuario">
                            <Form.Label>Correo electrónico</Form.Label>
                            <div className="input-group has-validation">
                              <span className="input-group-text">@</span>
                              <Form.Control
                                required
                                type="email"
                                name="correoUsuario"
                                className="form-control"
                                value={correoUsuario}
                                onChange={dobleEnlace}
                              />
                              <Form.Control.Feedback type="invalid">
                                correo electrónico es obligatorio
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group controlId="claveUsuario">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              name="claveUsuario"
                              className="form-control"
                              minLength={4}
                              value={claveUsuario}
                              onChange={dobleEnlace}
                            />
                            <Form.Control.Feedback type="invalid">
                              Mínimo 4 caracteres
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12 pt-2 pb-2">
                          <button className="btn btn-warning w-100 pt-2 pb-2"
                            type="submit">
                            Ingresar
                          </button>
                        </div>

                        <div className="col-12">
                          <p className="small mb-0 text-center">
                            ¿No tienes cuenta?{" "}
                            <Link to="/register"> ¡Registrate! </Link>
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