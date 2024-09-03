import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { InicioSesion } from "../../views/public/InicioSesion";
import { RegistroSesion } from "../../views/public/RegistroSesion";
import { NoEncontrado } from "../../views/shared/NoEncontrado";

import { Vigilante } from "../../security/Vigilante";
import UsuarioSesion from "../../security/UsuarioSesion";
import { TableroPrincipal } from "../../containers/TableroPrincipal";
import { TableroPublico } from "../../containers/TableroPublico";

const LazyInicioSesion = lazy(() => import("../../views/public/InicioSesion").then(() => ({ default: InicioSesion })));
const LazyRegistroSesion = lazy(() => import("../../views/public/RegistroSesion").then(() => ({ default: RegistroSesion })));
const LazyNoEncontrado = lazy(() => import("../../views/shared/NoEncontrado").then(() => ({ default: NoEncontrado })));
const LazyTableroPublico = lazy(() => import("../../containers/TableroPublico").then(() => ({ default: TableroPublico, })));
const LazyTablero = lazy(() => import("../../containers/TableroPrincipal").then(() => ({ default: TableroPrincipal, })));

export const RuteoCompleto = () => {
  return (
    <UsuarioSesion>
      <Routes>

      <Route path="/*" element={<LazyTableroPublico/>} />

        <Route path="/login" element={<LazyInicioSesion />} />
        <Route path="/register" element={<LazyRegistroSesion />} />

        <Route element={<Vigilante />}>
          <Route path="/dashboard/*" element={<LazyTablero />} />
        </Route>

        <Route path="*" element={<LazyNoEncontrado />} />
      </Routes>
    </UsuarioSesion>
  );
};