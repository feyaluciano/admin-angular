import { Provincia } from "./provincia";

export interface Persona {
  id: number;
  nombre?: string;
  apellido?: string;
  provinciaId?: number;
  provincia?: Provincia; 
  dni?: string;
  telefono?: string;
  fechaAlta?: string;
  fechaModificacion?: string;
  fechaBaja?: string | null;
  Checked?:boolean;   
  }
  