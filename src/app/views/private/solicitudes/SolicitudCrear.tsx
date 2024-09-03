import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useFormulario } from "../../../utilities/hooks/useFormulario";
import ServicioPrivado from "../../../services/ServicioPrivado";
import ApiBack from "../../../utilities/domains/ApiBack";
import { MensajeToastify } from "../../../utilities/functions/MensajeToastify";
import FormSelect from "react-bootstrap/esm/FormSelect";
import Solicitud from "../../../models/Solicitud";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { ContextoUsuario } from "../../../security/ContextoUsuario";

export const SolicitudCrear = () => {

  // Variables
  type formaHTML = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  let { tipoSolicitud, descripSolicitud, correoUsuSolicitud, dobleEnlace, objeto } =
    useFormulario<Solicitud>(new Solicitud("", 0, "", "",new Date()));
  const miUsuario = useContext(ContextoUsuario);
  const codigoUsuario = miUsuario?.autenticado.codUsuario;
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto._id = "";
    objeto.correoUsuSolicitud = "";
    objeto.tipoSolicitud = 0;
    objeto.descripSolicitud = "";

    formulario.correoUsuSolicitud.value = "";
    formulario.tipoSolicitud.value = 0;
    formulario.descripSolicitud.value = "";

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
      const cantidadSolicitudes = await ServicioPrivado.peticionGET(ApiBack.SOLICITUDES_CANT_USUARIO + "/" + codigoUsuario);
      if(cantidadSolicitudes >= 3){
        MensajeToastify("error", "No se puede crear la solicitud. Es posible que ya tenga 3 solicitudes pendientes", 8000);
      } else {
        const resultado = await ServicioPrivado.peticionPOST(ApiBack.SOLICITUDES_CREAR, objeto);
        if (resultado.id) {
          setEnProceso(false);
          MensajeToastify("success", "Solicitud creado con éxito", 6000);
        } else {
          MensajeToastify("error", "No se puede crear la solicitud. El correo suministrado no esta en la BD.", 8000);
        }
      }
      limpiarCajas(formulario);
    }
  };

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Solicitudes</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Crear solicitud</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      <div>
        <main>
          <div className="col-lg-12">
            <div className="card pt-0 align-items-center">
              <div className="card-body">
                <h5 className="card-title">Formulario de radicación de solicitudes</h5>

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
                      // value={nombreUsuario}
                      // onChange={dobleEnlace}
                      />
                      <Form.Control.Feedback type="invalid">
                        Nombre es obligatorio
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

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
                    <button className="w-100 btn btn-warning btn-lg" type="submit">
                      Radicar solicitud
                    </button>
                  </div>
                </Form>
              </div>

              <div className="py-5 pt-0 pb-2 text-center">
                <p className="lead">Señor usuario radique sus solicitudes y recuerde que no puede tener más de 3 solicitudes en pendientes.</p>
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