import Perfil from "./Perfil";

class UsuarioAdmin {
  public _id: string;
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public ciudadUsuario: string;
  public direccionUsuario: string;
  public telefonoUsuario: number;
  public fechaCreacionUsuario: Date;
  public nombreImagenUsuario: string;
  public avatarUsuario: string;
  public codPerfil: Perfil;

  constructor(id: string, nom: string, cor: string, cla: string, ciu: string, direc: string, tel: number, fec: Date, nomi: string, ava: string, codp: Perfil ) {
    this._id = id;
    this.nombreUsuario = nom;
    this.correoUsuario = cor;
    this.claveUsuario = cla;
    this.ciudadUsuario = ciu;
    this.direccionUsuario = direc;
    this.telefonoUsuario = tel;
    this.fechaCreacionUsuario = fec;
    this.nombreImagenUsuario = nomi;
    this.avatarUsuario = ava;
    this.codPerfil = codp;
  }
}

export default UsuarioAdmin;