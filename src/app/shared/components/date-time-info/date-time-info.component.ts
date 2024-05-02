import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time-info',
  templateUrl: './date-time-info.component.html',
  styleUrls: ['./date-time-info.component.css']
})
export class DateTimeInfoComponent implements OnInit {
  private fecha: Date = new Date();
  public fechaFormateada: string="";

  constructor() {
    this.fechaFormateada = "";

    if (this.fecha !== null) {
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];

      const dia = this.fecha.getDate();
      const mes = meses[this.fecha.getMonth()];
      const año = this.fecha.getFullYear();
      const horas = this.fecha.getHours().toString().padStart(2, '0'); // Formato de 24 horas
      const minutos = this.fecha.getMinutes().toString().padStart(2, '0');

      this.fechaFormateada = `${dia} de ${mes} de ${año}, ${horas}:${minutos}`;
    }
  }
  ngOnInit() {
  }

}
