import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Bienvenida } from "../../containers/Bienvenida";
import { AcercaDe } from "../../views/shared/AcercaDe";
import { NoEncontrado } from "../../views/shared/NoEncontrado";

import { PerfilListado } from "../../views/private/perfiles/PerfilListado";
import { PerfilCrear } from "../../views/private/perfiles/PerfilCrear";
import { PerfilAdmin } from "../../views/private/perfiles/PerfilAdmin";
import { PerfilActual } from "../../views/private/perfiles/PerfilActual";

import { UsuarioCrear } from "../../views/private/usuarios/UsuarioCrear";
import { UsuarioListado } from "../../views/private/usuarios/UsuarioListado";
import { UsuarioAdminn } from "../../views/private/usuarios/UsuarioAdmin";
import { UsuarioActual } from "../../views/private/usuarios/UsuarioActual";
import { UsuarioDetalle } from "../../views/private/usuarios/UsuarioDetalle";

import { SolicitudCrear } from "../../views/private/solicitudes/SolicitudCrear";
import { SolicitudListado } from "../../views/private/solicitudes/SolicitudListado";
import { SolicitudListAdmin } from "../../views/private/solicitudes/SolicitudListAdmin";
import { SolicitudAdmin } from "../../views/private/solicitudes/SolicitudAdmin";
import { SolicitudActual } from "../../views/private/solicitudes/SolicitudActual";

const cargando = (
  <main id="main" className="main">
    <div className="d-flex flex-row justify-content-center align-items-center">
    <div className="mt-5 text-black">
      <button className="btn btn-warning" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }}  ></span>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }}  ></span>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }}  ></span>
        Cargando...
      </button>
    </div>
  </div>
  </main>
);
// ***********************************************************************************************

const RecursoNoEncontrado = lazy(() => import("../../views/shared/NoEncontrado").then(() => ({ default: NoEncontrado, })));
const LazyBienvenida = lazy(() => import("../../containers/Bienvenida").then(() => ({ default: Bienvenida })));
const LazyAcercaDe = lazy(() => import("../../views/shared/AcercaDe").then(() => ({ default: AcercaDe, })));
const LazyPerfilListado = lazy(() => import("../../views/private/perfiles/PerfilListado").then(() => ({ default: PerfilListado, })))
const LazyPerfilCrear = lazy(() => import("../../views/private/perfiles/PerfilCrear").then(() => ({ default: PerfilCrear, })))
const LazyPerfilAdmin = lazy(() => import("../../views/private/perfiles/PerfilAdmin").then(() => ({ default: PerfilAdmin, })))
const LazyPerfilActual = lazy(() => import("../../views/private/perfiles/PerfilActual").then(() => ({ default: PerfilActual, })))

const LazyRegistroUsuarioAdmin = lazy(() => import("../../views/private/usuarios/UsuarioCrear").then(() => ({ default: UsuarioCrear })));
const LazyUsuarioListado = lazy(() => import("../../views/private/usuarios/UsuarioListado").then(() => ({ default: UsuarioListado })));
const LazyUsuarioAdmin = lazy(() => import("../../views/private/usuarios/UsuarioAdmin").then(() => ({ default: UsuarioAdminn })));
const LazyUsuarioActual = lazy(() => import("../../views/private/usuarios/UsuarioActual").then(() => ({ default: UsuarioActual })));
const LazyUsuarioDetalle = lazy(() => import("../../views/private/usuarios/UsuarioDetalle").then(() => ({ default: UsuarioDetalle })));

const LazySolicitudCrear = lazy(() => import("../../views/private/solicitudes/SolicitudCrear").then(() => ({ default: SolicitudCrear })));
const LazySolicitudListado = lazy(() => import("../../views/private/solicitudes/SolicitudListado").then(() => ({ default: SolicitudListado })));
const LazySolicitudListAdmin = lazy(() => import("../../views/private/solicitudes/SolicitudListAdmin").then(() => ({ default: SolicitudListAdmin })));
const LazySolicitudAdmin = lazy(() => import("../../views/private/solicitudes/SolicitudAdmin").then(() => ({ default: SolicitudAdmin })));
const LazySolicitudActual = lazy(() => import("../../views/private/solicitudes/SolicitudActual").then(() => ({ default: SolicitudActual })));

export const RuteoTablero = () => {
  return (
    <Suspense fallback={cargando}>
      <Routes>
        <Route path="/" element={<LazyBienvenida />} />
        <Route path="/about" element={<LazyAcercaDe />} />

        <Route path="/listprofiles" element={<LazyPerfilListado />} />
        <Route path="/addprofile" element={<LazyPerfilCrear />} />
        <Route path="/admprofile" element={<LazyPerfilAdmin />} />
        <Route path="/updateprofile/:codigo" element={<LazyPerfilActual />} />

        <Route path="/register-admin" element={<LazyRegistroUsuarioAdmin />} />
        <Route path="/listusers" element={<LazyUsuarioListado />} />
        <Route path="/admuser" element={<LazyUsuarioAdmin />} />
        <Route path="/updateuser/:codigo" element={<LazyUsuarioActual />} />
        <Route path="/detailuser/:codigo" element={<LazyUsuarioDetalle />} />

        <Route path="/radicar-pqr" element={<LazySolicitudCrear />} />
        <Route path="/listpqr" element={<LazySolicitudListado />} />
        <Route path="/listpqr-all" element={<LazySolicitudListAdmin />} />
        <Route path="/admpqr" element={<LazySolicitudAdmin />} />
        <Route path="/updatepqr/:codigo" element={<LazySolicitudActual />} />

        <Route path="*" element={<RecursoNoEncontrado />} />
      </Routes>
    </Suspense>
  );
};