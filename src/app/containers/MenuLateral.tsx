import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextoUsuario } from "../security/ContextoUsuario";

import { opcionesAdmin, opcionesInvitado, } from "../utilities/domains/OpcionesSistema";

export const MenuLateral = () => {
  let opciones: any[] = [];
  const miUsuario = useContext(ContextoUsuario);
  const nombrePerfil = miUsuario?.autenticado.perfil;

  switch (nombrePerfil) {
    case "Administrador":
      opciones = opcionesAdmin;
      break;
    case "Invitado":
      opciones = opcionesInvitado;
      break;
    default:
      console.log("No hay menú...");
      break;
  }
  return (
    <aside id="sidebar" className="sidebar">
      <div className="d-flex align-items-center pb-3 mb-3 link-dark border-bottom">
        <i className="fs-5 bi bi-person-fill" style={{ paddingRight: "10px" }} ></i>
        <span className="fs-5 fw-semibold">{nombrePerfil}</span>
      </div>

      <ul className="sidebar-nav" id="sidebar-nav">
        {opciones.map((opcion, indice) =>
          opcion.hijos.length ? (
            <li className="nav-item" key={"li" + indice}>
              <a className="nav-link collapsed text-black" data-bs-target={"#menu" + indice} data-bs-toggle="collapse"
                href="/#">
                <i className={opcion.icono}></i>
                <span>{opcion.nombre}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id={"menu" + indice} className="nav-content collapse" data-bs-parent="#sidebar-nav">
                {opcion.hijos.map((subMenu: any, otroIndice: number) => (
                  <li key={"sub" + otroIndice}>
                    <Link to={subMenu.ruta}>
                      <i className={subMenu.icono}></i>
                      <span className="text-black">{subMenu.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className="nav-item" key={indice}>
              <Link to={opcion.ruta} className="nav-link collapsed text-black">
                <i className={opcion.icono}></i>
                <span>{opcion.nombre}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
};