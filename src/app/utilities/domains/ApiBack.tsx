const ApiBack = {
  URL:"https://servitic.herokuapp.com",
  URL_LOCAL: "http://localhost:3123",
  CREAR_USUARIO: "/api/publica/usuarios/crear",
  INICIAR_SESION: "/api/publica/usuarios/iniciar",

  PERFILES_CREAR: "/api/privada/perfiles/crear",
  PERFILES_OBTENER: "/api/privada/perfiles/todos",
  PERFILES_ELIMINAR: "/api/privada/perfiles/eliminar",
  PERFILES_OBTENER_UNO: "/api/privada/perfiles/uno",
  PERFILES_ACTUALIZAR: "/api/privada/perfiles/actualizar",

  USUARIOS_CREAR: "/api/privada/usuarios/crear",
  USUARIOS_OBTENER: "/api/privada/usuarios/todos",
  USUARIOS_OBTENER_UNO: "/api/privada/usuarios/uno",
  USUARIOS_ELIMINAR: "/api/privada/usuarios/eliminar",
  USUARIOS_ACTUALIZAR: "/api/privada/usuarios/actualizar",

  SOLICITUDES_CREAR: "/api/privada/solicitudes/crear",
  SOLICITUDES_ELIMINAR: "/api/privada/solicitudes/eliminar",
  SOLICITUDES_OBTENER: "/api/privada/solicitudes/todos",
  SOLICITUDES_OBTENER_UNO: "/api/privada/solicitudes/uno",
  SOLICITUDES_ACTUALIZAR: "/api/privada/solicitudes/actualizar",
  SOLICITUDES_CANT_USUARIO: "/api/privada/solicitudes/cantsoliuser",
  SOLICITUDES_USUARIO: "/api/privada/solicitudes/solicitudesuser"
};

export default ApiBack;