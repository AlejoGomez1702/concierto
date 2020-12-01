import { VentaService } from './../../servicios/venta.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstadioService } from 'src/app/servicios/estadio.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

import Swal from 'sweetalert2'
import { DialogoListaUsuariosComponent } from '../dialogo-lista-usuarios/dialogo-lista-usuarios.component';
import { ConciertoService } from 'src/app/servicios/concierto.service';

export interface Grada {
  color: string;
  columnas: number;
  rows: number;
  text: string;
};

export interface Asiento{
  ocupado: number, //0=> 2 dias, 1=> 1 dia, 0=> ocupado.
  valor1: number,
  valor2: number,
  vip: boolean,
  ubicacion: string,
  indice: number,
  id: number
}

export interface Concierto{
  id: string,
  nombre: string,
  descripcion: string,
  dia: number,
  descuento?: number
};


@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})
export class EstadioComponent implements OnInit 
{
  // Todos los asientos del estadio.
  public asientos: Asiento[] =[];

  public conciertos: Concierto[] = [{
    id: "1",
    nombre: "",
    descripcion: "",
    dia: 1
  },{
    id: "2",
    nombre: "",
    descripcion: "",
    dia: 2, 
    descuento: 1000
  }];

  // Grada NORTE.
  public gradaNorte: Grada = {text: 'Norte', columnas: 6, rows: 1, color: '#DDBDF1'};
  // Grada OCCIDENTAL.
  public gradaOccidental: Grada = {text: 'Occidental', columnas: 1, rows: 4, color: '#DDBDF1'};
  // Grada ORIENTAL.
  public gradaOriental: Grada = {text: 'Oriental', columnas: 1, rows: 4, color: '#DDBDF1'};
  // Grada SUR.
  public gradaSur: Grada = {text: 'Sur', columnas: 6, rows: 1, color: '#DDBDF1'};


  constructor(
    private estadioServicio: EstadioService,
    private dialogo: MatDialog,
    private servicioVenta: VentaService,
    private servicioConcierto: ConciertoService
  ) 
  { }

  ngOnInit(): void 
  {
    this.obtenerAsientos();
  }

  obtenerAsientos()
  {
    this.estadioServicio.obtenerAsientos().subscribe((asientos) => {
      asientos.forEach((asiento) => {
        const data = asiento.data();
        
        const asientoNuevo = {
          indice: data['indice'],
          ocupado: data['ocupado'],
          ubicacion: data['ubicacion'],
          valor1: data['valor1'],
          valor2: data['valor2'],
          vip: data['vip'],
          id: asiento.id
        }
        this.asientos.push(<any>asientoNuevo);
      })
    });
  }

  escojerCompra(asiento){
    if (asiento.ocupado === 2) { //No se puede vender, ya se vendieron todos los asientos.
      Swal.fire('Asiento no disponible','Esta asiento ya está ocupado para las dos funciones del concierto','warning')
      return; 
    }
    Swal.fire({
      title: 'Información de compra',
      text: 'Deseas asociar tus datos con la compra? ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, asociar mis datos',
      cancelButtonText: 'No, continuar como anomimo'
    }).then((result) => {
      if (result.value) {
        const dialogRefU = this.dialogo.open(DialogoListaUsuariosComponent);
        dialogRefU.afterClosed().subscribe(
          result => {
            // if (result) {
              this.consultarOcupacion(asiento);
            // }else{
              // return;
            // }
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.consultarOcupacion(asiento)
      }
    })
  }

  comprarBoleta(asiento, dia?)
  {
    this.obtenerConciertos();
    const { ocupado }  = asiento;
    
    switch (ocupado) {
      case 0:
        this.servicioVenta.agregarVenta({asiento: asiento.id,dia})
        .then(respuesta => {
          this.estadioServicio.actualizarAsiento(asiento.id,1).then(
            res => {
              let info = 'Ubicación: ' + asiento.ubicacion + '\n' +
                           'Id: ' + asiento.indice + '\n' +
                           'VIP: ' + asiento.vip + '\n';
              if(dia == 1)
              {
                info += 'Valor: ' + asiento.valor1;                
              }
              else if(dia == 2)
              {           
                
                if(!asiento.vip)     
                {
                  info += 'Descuento: ' + this.conciertos[1].descuento;
                  info += 'Valor: ' + (asiento.valor2 - this.conciertos[1].descuento);
                }
                else{
                  info += 'Descuento: ' + 'Es VIP';
                  info += 'Valor: ' + asiento.valor2;
                }
                
              }
              Swal.fire('Compra realizada', info, 'success')
              this.asientos = []
              this.obtenerAsientos()
            }
          )
        }).catch(error => {
          console.log(error);
        })
        break;
      case 1:
        this.servicioVenta.agregarVenta({asiento: asiento.id,dia:2})
        .then(respuesta => {
          this.estadioServicio.actualizarAsiento(asiento.id,2).then(            
            res => {
              let info = 'Ubicación: ' + asiento.ubicacion + '\n' +
                           'Id: ' + asiento.indice + '\n' +
                           'VIP: ' + asiento.vip + '\n';
              if(dia == 1)
              {
                info += 'Valor: ' + asiento.valor1;                
              }
              else if(dia == 2 || !dia)
              {
                this.obtenerConciertos();
                if(!asiento.vip)
                {
                  info += 'Descuento: ' + this.conciertos[1].descuento;
                  info += 'Valor: ' + (asiento.valor2 - this.conciertos[1].descuento);
                }
                else
                {
                  info += 'Descuento: ' + 'Es VIP';
                  info += 'Valor: ' + asiento.valor2;
                }
                
              }
              Swal.fire('Compra realizada', info, 'success')
              this.asientos = []
              this.obtenerAsientos()
            }
          )
        }).catch(error => {
          console.log(error);
        })
        break;
      default:
        console.log('No se puede vender boletas para este asiento');
        break;
    }

  }

  consultarOcupacion(asiento, user?){
    const { ocupado } = asiento;
    if (ocupado === 0) {
      const dialogRef = this.dialogo.open(DialogoComponent,{
        width: '300px',
        data: {asiento}
      })
      dialogRef.afterClosed().subscribe(
        data => {
          const { dia, datos } = data;
          this.comprarBoleta(datos.asiento, dia)
        }
      )
    }else{
      this.comprarBoleta(asiento);
    }
  }

  async obtenerConciertos()
  {
    let id = 0;
    // this.conciertos = [];
    await this.servicioConcierto.obtenerConciertos().subscribe((conciertos) => {
      conciertos.forEach((concierto) => {
        // console.log(<Asiento>asiento.data());
        this.conciertos.splice(id, id, <Concierto>concierto.data());
        id ++;
      })
    });
  }



}
