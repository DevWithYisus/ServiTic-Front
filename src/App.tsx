import { BrowserRouter } from "react-router-dom";
import './App.css';

import { Suspense } from "react";
import { RuteoCompleto } from "./app/utilities/routes/RuteoCompleto";

const tocaEsperar = (
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

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Suspense fallback={tocaEsperar}>
          <RuteoCompleto />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
