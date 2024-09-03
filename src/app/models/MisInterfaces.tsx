import MiSesion from "./MiSesion";

export interface propSesion { children: React.ReactNode; } // Propiedades de la sesion

export type propUsuario = { autenticado: MiSesion; actualizar: (usu: MiSesion) => void; };