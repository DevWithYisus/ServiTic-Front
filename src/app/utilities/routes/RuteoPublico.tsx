import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Inicio } from "../../views/public/Inicio";
import { Nosotros } from "../../views/public/Nosotros";
import { NoEncontrado } from "../../views/shared/NoEncontrado";

// Carga Lazy - Supenso
// ***********************************************************************************************
const cargando = (
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
);
// ***********************************************************************************************

const RecursoNoEncontrado = lazy(() => import("../../views/shared/NoEncontrado").then(() => ({ default: NoEncontrado, })));
const LazyInicio = lazy(() => import("../../views/public/Inicio").then(() => ({ default: Inicio })));
const LazyNosotros = lazy(() => import("../../views/public/Nosotros").then(() => ({ default: Nosotros, })));

export const RuteoPublico = () => {
  return (
    <Suspense fallback={cargando}>
      <Routes>
        <Route path="/" element={<LazyInicio />} />
        <Route path="/about-us" element={<LazyNosotros />} />

        <Route path="*" element={<RecursoNoEncontrado />} />
      </Routes>
    </Suspense>
  );
};