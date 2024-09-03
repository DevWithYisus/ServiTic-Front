import { Link } from "react-router-dom";
import fotoTripulante from "../../../assets/images/dexter.jpg";
import fotoTripulante2 from "../../../assets/images/mndy.png";
import fotoTripulante3 from "../../../assets/images/perry.jpg";
import fotoTripulante4 from "../../../assets/images/puro-hueso.jpg";

export const AcercaDe = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Acerca de ...</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Listado de tripulantes</li>
          </ol>
        </nav>
      </div>

      <div className="mt-4">
        <div className="card-group">
        <div className="col" style={{paddingRight: "10px"}}>
          <div className="card" >
            <img src={fotoTripulante} className="card-img-top" alt="..." style={{padding: "25px 10px 0px 10px"}}/>
              <div className="card-body">
                <h5 className="card-title">Adrian Mauricio Castaño</h5>
                <p className="card-text">Ingeniero Mecánico / Software Developer</p>
              </div>
          </div>
        </div>
        <div className="col" style={{paddingRight: "10px"}}>
          <div className="card">
            <img src={fotoTripulante2} className="card-img-top" alt="..." style={{padding: "15px 10px 0px 10px"}}/>
              <div className="card-body">
                <h5 className="card-title">Diana Sofía Afanador</h5>
                <p className="card-text">Ingeniera electrónica / Software Developer </p>
              </div>
          </div>
        </div>
        <div className="col" style={{paddingRight: "10px"}}>
          <div className="card">
            <img src={fotoTripulante3} className="card-img-top" alt="..." style={{padding: "25px 10px 0px 10px"}}/>
              <div className="card-body">
                <h5 className="card-title">Nicolas Miguel Caicedo</h5>
                <p className="card-text">Ingeniero Civil / Software Developer</p>
              </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src={fotoTripulante4} className="card-img-top" alt="..." style={{padding: "25px 10px 0px 10px"}}/>
              <div className="card-body">
                <h5 className="card-title">Jesus Manuel Zambrano</h5>
                <p className="card-text">Ingeniero de Sistemas / Software Developer</p>
              </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};