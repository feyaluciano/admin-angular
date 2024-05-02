import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tiempoTranscurrido'
})
export class TiempoTranscurridoPipe implements PipeTransform {
  transform(fechaObjeto: Date): string {    
    var fecha = new Date (fechaObjeto);    
    let ahora = Date.now();    
    let diferencia = ahora - fecha.getTime();
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    let resultado = `${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
    return resultado;
  }
}
