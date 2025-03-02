import { Link } from "react-router-dom";
import miLogo from "../../assets/images/servitic-bg.png";

export const Cabecera = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{padding: "7px 10px"}}>
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="/#"> */}
            <img src={miLogo} alt="" style={{paddingRight: "50px"}}/>
          {/* </a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{paddingRight: "10px"}}>
                <Link to="/" className="nav-link active">
                  Inicio
                </Link>
              </li>
              <li className="nav-item" style={{paddingRight: "10px"}}>
                <Link to="/about-us" className="nav-link active">
                  Quienes somos
                </Link>
              </li>
              <li className="nav-item dropdown" style={{paddingRight: "10px"}}>
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos y Servicios
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/#">Opcion 1</Link></li>
                  <li><Link className="dropdown-item" to="/#">Opcion 2</Link></li>
                  <li><a className="dropdown-item" href="/#">Opcion 3</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown" style={{paddingRight: "10px"}}>
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inversionistas
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/#">Opcion 1</Link></li>
                  <li><Link className="dropdown-item" to="/#">Opcion 2</Link></li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text">
              <Link to="/login" className="nav-link">
                <button className="btn btn-sm btn-outline-warning text-black" type="submit">Inicio Sesión</button>
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}