import { Link } from "react-router-dom";
import sopInt from "../../../assets/images/soporteTecnico.png";
import clientes from "../../../assets/images/clientes.png";
import capacitacion from "../../../assets/images/capacitacion.png";

export const Inicio = () => {
  return (
    <div className="mt-3 container-fluid">
      <div className="row py-lg-5 bg-dark-light">
        <div className="col-lg-6 col-md-8 mx-auto text-center">
          <h1 className="">Servitic</h1>
          <p className="">
            ServiTIC es una herramienta para soportar mesas de ayuda que pueda
            ser implementada por cualquier empresa interesada en adquirir este
            software. Permite crear solicitudes PQRs (peticiones, quejas y
            reclamos) solo a usuarios registrados en la plataforma. De igual
            manera permite hacer seguimiento al ciclo de vida de su solicitud.
          </p>
          <label htmlFor=""></label>
          <p>
            <Link to="/register">
              <button
                className="btn btn-warning btn-lg px-4 me-md-2"
                type="button"
              >
                Registrarse
              </button>
            </Link>
          </p>
        </div>
      </div>
      <div className="container marketing mt-4">
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              Gestiona y organiza tus requerimientos{" "}
            </h2>
            <p className="lead">
              Los administradores pueden hacer seguimiento a una solicitud, dar
              respuesta y cerrar solitudes terminadas.
            </p>
          </div>
          <div className="col-md-5">
            <img
              src={capacitacion}
              className="d-flexcard-card-img-top img-thumbnail"
              alt="Bootstrap Themes"
              loading="lazy"
              width="400"
              height="300"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
      <div className="container marketing mt-4">
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              Capacitaciones personalizadas{" "}
            </h2>
            <p className="lead">
              Al adquirir nuestro servicio, vendra incluida una sesión
              personalizadas con el fin de que nuestros clientes tengan los
              conocimientos del uso de la plataforma y puedan manejarla de la
              mejor forma.
            </p>
          </div>
          <div className="col-md-5">
            <img
              src={clientes}
              className="d-flexcard-card-img-top img-thumbnail"
              alt="Bootstrap Themes"
              loading="lazy"
              width="400"
              height="500"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex bg-dark-light mt-3">
        <div className="d-flex mt-3 mx-auto">
          <div className="d-flex flex-md-equal w-100 my-md-3 ps-md-1">

            <div className="bg-light me-md-5 pt-3 px-3 pt-md-5 px-md-5 text-center text-bg-body overflow-hidden">
              <img
                src={sopInt}
                className="d-flexcard-card-img-top img-thumbnail"
                alt="Bootstrap Themes"
                loading="lazy"
                width="400"
                height="500"
                style={{ borderRadius: "12px" }}
              />
              <div className="my-3 py-0">
                <h2 className="display-4">Soporte técnico</h2>
                <p className="lead">De lunes a viernes de 7:00am a 5:00pm</p>
                <button type="button" className="btn btn-warning">
                  Contactenos
                </button>
              </div>
              <div className="bg-dark shadow-sm mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <small className="d-block mb-3 text-muted">© 2022 Servitic</small>
            </div>
            <div className="col-6 col-md">
              <h5>Siguenos</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Facebook
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Linkedin
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Instagram
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Fuentes</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Resource
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Resource name
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Another resource
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Final resource
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Acerca de nosotros</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Carreras
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Locaciones
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Privacidad
                  </a>
                </li>
                <li className="mb-1">
                  <a className="link-secondary text-decoration-none" href="#">
                    Terminos y condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
      <div>
      </div>
    </div>
  );
};
