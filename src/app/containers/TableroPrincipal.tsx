import { MenuLateral } from "./MenuLateral";
import { MenuSuperior } from "./MenuSuperior";
import { RuteoTablero } from "../utilities/routes/RuteoTablero";

export const TableroPrincipal = () => {
  return (
    <div>
      <MenuSuperior />
      <MenuLateral />

      <RuteoTablero />
    </div>
  );
};