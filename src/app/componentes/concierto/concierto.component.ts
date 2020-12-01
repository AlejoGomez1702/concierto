import { Component, OnInit } from '@angular/core';
import { ConciertoService } from 'src/app/servicios/concierto.service';
import Swal from 'sweetalert2'

export interface Concierto{
  id: string,
  nombre: string,
  descripcion: string,
  dia: number,
  descuento?: number
};

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.css']
})
export class ConciertoComponent implements OnInit 
{
  public nombre = '';

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

  constructor(
    private conciertoServicio: ConciertoService
  ) 
  { 
    this.obtenerConciertos();
    console.log('Listado de conciertos');
    console.log(this.conciertos);
  }

  ngOnInit(): void 
  {
    // this.obtenerConciertos();
  }

  async obtenerConciertos()
  {
    let id = 0;
    // this.conciertos = [];
    await this.conciertoServicio.obtenerConciertos().subscribe((conciertos) => {
      conciertos.forEach((concierto) => {
        // console.log(<Asiento>asiento.data());
        this.conciertos.splice(id, id, <Concierto>concierto.data());
        id ++;
      })
    });
  }

  guardarDatos(index)
  {
    console.log(this.conciertos);
    console.log(this.nombre);
    const concierto = this.conciertos[index];
    const id: string = (index + 1) + '';
    console.log(concierto);
    this.conciertoServicio.editarConcierto(id, concierto).then(() => {
        Swal.fire('exito!','Datos guardados', 'success');
      }
    ).catch(() => {
      Swal.fire('Error','guardando los datos en firebase', 'warning');
    });
  }

}
