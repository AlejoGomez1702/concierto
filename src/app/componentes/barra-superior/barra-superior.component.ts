import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadioService } from 'src/app/servicios/estadio.service';

export interface Asiento{
  ocupado: boolean,
  valor1: number,
  valor2: number,
  vip: boolean,
  ubicacion: string
}


@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit 
{
  // public asientos: Asiento[] =[];

  constructor(
    private estadioServicio: EstadioService,
    private routing: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarVentas()
  {
    this.estadioServicio.iniciarNuevoConcierto();
  }

  editarConcierto()
  {
    
  }

  // obtenerAsientos()
  // {
  //   this.estadioServicio.obtenerAsientos().subscribe((asientos) => {
  //     asientos.forEach((asiento) => {
  //       console.log(<Asiento>asiento.data());
  //       this.asientos.push(<Asiento>asiento.data());
  //     })
  //   });
  // }

}
