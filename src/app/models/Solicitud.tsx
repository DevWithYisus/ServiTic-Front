export class Solicitud {
  public _id: string;
  public tipoSolicitud: number;
  public descripSolicitud: string;
  public correoUsuSolicitud: string;
  public fechaSolicitud: Date;

  constructor(id: string, tipoSoli: number, descripSoli: string, correoUsu: string, fecha:Date) {
    this._id = id;
    this.tipoSolicitud = tipoSoli;
    this.descripSolicitud = descripSoli;
    this.correoUsuSolicitud = correoUsu;
    this.fechaSolicitud= fecha;
    
  }
}
export default Solicitud;