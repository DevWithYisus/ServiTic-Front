import { createContext } from "react";
import { propUsuario } from "../models/MisInterfaces";

export const ContextoUsuario = createContext<propUsuario | null>(null);