// import { url } from "inspector"
import miLogo from "../../../assets/images/data_about_us.jpg"

export const Nosotros = () => {
  return (
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center px-4 g-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={miLogo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" width="700" height="500" style={{ borderRadius: "12px" }} />
          </div>
          <div className="col-lg-6">
            <h2 className="display-5 fw-normal">Somos Servitic</h2>
            <p className="lead">Nuestra historia comienza con lo que realmente significa ser un innovador tecnológico. Se deriva de un sentido común de propósito que une a la gente de ServiTic que, representando a más de 160 nacionalidades, brinda soluciones digitales líderes e implementa tecnologías innovadoras para permitir el rendimiento y la sustentabilidad que son cruciales para la industria IT mundial.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-warning btn-lg px-4 me-md-2">Unete a nosotros</button>
              <button type="button" className="btn btn-outline-warning btn-lg px-4 text-black">Servicios</button>
            </div>
          </div>
        </div>

        <div className="container py-3">
          <header>
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center border-top py-5">
              <h2 className="display-5 fw-normal">Precios</h2>
              <p className="fs-5 text-muted">Comienza a usar nuestras alternativas de software totalmente gratis, si te gusta puedes adquirir nuevas soluciones, extraseguridad, capacidad iliminatada de usuarios con acceso a tus aplicaciones y más.</p>
            </div>
          </header>

          {/* <main> */}
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Free</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>10 users included</li>
                    <li>2 GB of storage</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-outline-warning text-black">Ingrese gratis</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Pro</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">$15<small className="text-muted fw-light">/mo</small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>20 users included</li>
                    <li>10 GB of storage</li>
                    <li>Priority email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-warning">Iniciar</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm border-warning">
                <div className="card-header py-3 text-bg-warning border-warning">
                  <h4 className="my-0 fw-normal">Enterprise</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">$29<small className="text-muted fw-light">/mo</small></h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>30 users included</li>
                    <li>15 GB of storage</li>
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-warning">Contactenos</button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="display-6 text-center mb-4">Compare los planes</h2>

          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th style={{ width: "34%" }}></th>
                  <th style={{ width: "22%" }}>Free</th>
                  <th style={{ width: "22%" }}>Pro</th>
                  <th style={{ width: "22%" }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-start">Public</th>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Private</th>
                  <td></td>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th scope="row" className="text-start">Permissions</th>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Sharing</th>
                  <td></td>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Unlimited members</th>
                  <td></td>
                  <td><i className="fa-solid fa-check"></i></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Extra security</th>
                  <td></td>
                  <td></td>
                  <td><i className="fa-solid fa-check"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* </main> */}

          <footer className="pt-4 my-md-5 pt-md-5 border-top">
            <div className="row">
              <div className="col-12 col-md">
                <small className="d-block mb-3 text-muted">© 2022 Servitic</small>
              </div>
              <div className="col-6 col-md">
                <h5>Siguenos</h5>
                <ul className="list-unstyled text-small">
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Facebook</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Linkedin</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Instagram</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Twitter</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Fuentes</h5>
                <ul className="list-unstyled text-small">
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Resource</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Resource name</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Another resource</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Final resource</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Acerca de nosotros</h5>
                <ul className="list-unstyled text-small">
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Carreras</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Locaciones</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Privacidad</a></li>
                  <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Terminos y condiciones</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>

  );
}