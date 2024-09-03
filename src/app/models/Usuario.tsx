class Usuario {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public ciudadUsuario: string;
  public direccionUsuario: string;
  public telefonoUsuario: number;

  constructor(nom: string, cor: string, cla: string, ciu: string, direc: string, tel: number) {
    this.nombreUsuario = nom;
    this.correoUsuario = cor;
    this.claveUsuario = cla;
    this.ciudadUsuario = ciu;
    this.direccionUsuario = direc;
    this.telefonoUsuario = tel;
  }
}

export default Usuario;
