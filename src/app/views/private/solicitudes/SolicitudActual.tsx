import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useFormulario } from "../../../utilities/hooks/useFormulario";
import ServicioPrivado from "../../../services/ServicioPrivado";
import ApiBack from "../../../utilities/domains/ApiBack";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Solicitud from "../../../models/Solicitud";
import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { ContextoUsuario } from "../../../security/ContextoUsuario";

export const SolicitudActual = () => {
  // Variables
  let { codigo } = useParams();
  type formaHTML = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  
  let {
    tipoSolicitud,
    descripSolicitud,
    correoUsuSolicitud,
    dobleEnlace,
    objeto,
  } = useFormulario<Solicitud>(new Solicitud("", 0, "", "", new Date()));

  const obtenerSolicitudes = async () => {
    const urlCargarUnPerfil = ApiBack.SOLICITUDES_OBTENER_UNO + "/" + codigo;
    const SolicitudRecibido = await ServicioPrivado.peticionGET(
      urlCargarUnPerfil
    );
    objeto._id = SolicitudRecibido._id;
    objeto.tipoSolicitud = SolicitudRecibido.tipoSolicitud;
    objeto.descripSolicitud = SolicitudRecibido.descripSolicitud;
    objeto.correoUsuSolicitud = SolicitudRecibido.correoUsuSolicitud;

    if (SolicitudRecibido) {
      setTodoListo(true);
    }
  };
  const enviarFormulario = async (fh: formaHTML) => {
    fh.preventDefault();
    setEnProceso(true);

    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const urlActualizar = ApiBack.SOLICITUDES_ACTUALIZAR + "/" + objeto._id;
      const resultado = await ServicioPrivado.peticionPUT(
        urlActualizar,
        objeto
      );

      if (resultado.nuevo) {
        setEnProceso(false);
        MensajeToastify("error", "No se puede actualizar la solicitud", 6000);
      } else {
        MensajeToastify("success", "Solicitud actualizada correctamente", 6000);
      }
    }
  };

  useEffect(() => {
    obtenerSolicitudes();
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
            <li className="breadcrumb-item">
              <Link to="/dashboard/admprofile">
                Administración de solicitudes
              </Link>
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
                <h5 className="card-title">Modificar peticiones</h5>
                {cargaFinalizada ? (
                  <Form
                    noValidate
                    className="row g-3"
                    validated={enProceso}
                    onSubmit={enviarFormulario}
                  >
                    {/* <div className="col-12">
                      <Form.Group controlId="nombreUsuario">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="nombreUsuario"
                          className="form-control"
                          //value={nombreUsuario}
                          //onChange={dobleEnlace}
                        />
                        <Form.Control.Feedback type="invalid">
                          Nombre es obligatorio
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div> */}

                    <div className="col-12">
                      <Form.Group controlId="correoUsuSolicitud">
                        <Form.Label>Correo electrónico</Form.Label>
                        <div className="input-group has-validation">
                          {/* <span className="input-group-text">@</span> */}
                          <Form.Control
                            required
                            type="email"
                            name="correoUsuSolicitud"
                            className="form-control"
                            placeholder="your-email@example.com"
                            value={correoUsuSolicitud}
                            onChange={dobleEnlace}
                          />
                          <Form.Control.Feedback type="invalid">
                            correo electrónico es obligatorio
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="tipoSolicitud">
                        <Form.Label>Tipo de solicitud</Form.Label>
                        <FormSelect
                          required
                          name="tipoSolicitud"
                          className="form-control"
                          value={tipoSolicitud}
                          onChange={dobleEnlace}
                        >
                          <option value="">Elegir...</option>
                          <option value="1">Petición</option>
                          <option value="2">Queja</option>
                          <option value="3">Reclamo</option>
                          <option value="4">Sugerencia</option>
                        </FormSelect>
                        <Form.Control.Feedback type="invalid">
                          Por favor escoja una opción.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="descripSolicitud">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          type="text"
                          name="descripSolicitud"
                          className="form-control"
                          placeholder="Describa el motivo de su solicitud"
                          value={descripSolicitud}
                          onChange={dobleEnlace}
                        />
                        <Form.Control.Feedback type="invalid">
                          Descripción obligatoria
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12 pt-0 pb-2">
                      <hr className="my-4"></hr>
                      <button
                        className="w-100 btn btn-warning btn-lg"
                        type="submit"
                      >
                        Actualizar solicitud
                      </button>
                    </div>
                  </Form>
                ) : (
                  <div>Cargando información para la edición</div>
                )}{" "}
              </div>
              <div className="py-5 pt-0 pb-2 text-center">
                <p className="lead">Se actualizara la peticion del cliente</p>
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
