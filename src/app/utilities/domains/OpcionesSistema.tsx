const opcionesAdmin = [
  { nombre: "Acerca de", icono: "bi bi-grid text-warning", ruta: "/dashboard/about", hijos: [], },
  {
    nombre: "Perfiles", icono: "bi bi-clipboard-data text-warning", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle text-warning", ruta: "/dashboard/listprofiles", },
      { nombre: "Agregar", icono: "bi bi-circle text-warning", ruta: "/dashboard/addprofile" },
      { nombre: "Administración", icono: "bi bi-circle text-warning", ruta: "/dashboard/admprofile", },
    ]
  },
  {
    nombre: "Usuarios", icono: "bi bi-person-lines-fill text-warning", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle text-warning", ruta: "/dashboard/listusers", },
      { nombre: "Agregar", icono: "bi bi-circle text-warning", ruta: "/dashboard/register-admin" },
      { nombre: "Administración", icono: "bi bi-circle text-warning", ruta: "/dashboard/admuser", },
    ]
  },
  {
    nombre: "Solicitudes", icono: "bi bi-envelope-paper text-warning", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle text-warning", ruta: "/dashboard/listpqr-all", },
      { nombre: "Agregar", icono: "bi bi-circle text-warning", ruta: "/dashboard/radicar-pqr" },
      { nombre: "Administración", icono: "bi bi-circle text-warning", ruta: "/dashboard/admpqr", },
    ]
  }
];


// *********************************************************************************


const opcionesInvitado = [
  { nombre: "Acerca de", icono: "bi bi-grid text-warning", ruta: "/dashboard/about", hijos: [], },
  {
    nombre: "Solicitudes", icono: "bi bi-envelope-paper text-warning", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle text-warning", ruta: "/dashboard/listpqr", },
      { nombre: "Agregar", icono: "bi bi-circle text-warning", ruta: "/dashboard/radicar-pqr" },
    ]
  },
  {
    nombre: "Compras", icono: "bi bi-cart text-warning", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle text-warning", ruta: "/dashboard/shop", },
      { nombre: "Agregar", icono: "bi bi-circle text-warning", ruta: "/dashboard/admshop" },
    ]
  }
];

export { opcionesAdmin, opcionesInvitado };