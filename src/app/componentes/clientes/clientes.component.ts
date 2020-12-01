import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

export interface Cliente {
  cedula: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
}

// const clientes: Cliente[] = [];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit 
{
  public clientes: Cliente[] = [];
  
  // displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'celular', 'correo'];
  // dataSource: MatTableDataSource<Cliente>;

  constructor(
    private router: Router,
    private clienteServicio: ClienteService,
    // private changeDetectorRefs: ChangeDetectorRef
  ) 
  { 
    // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit()
  {
    this.obtenerClientes();
  }

  obtenerClientes()
  {    
    // this.ELEMENT_DATA = [];
    // this.clienteServicio.obtenerClientes();
    this.clienteServicio.obtenerClientes().subscribe((clientes) => {
      clientes.forEach((cliente) => {
        // console.log(<Asiento>asiento.data());
        this.clientes.push(<Cliente>cliente.data());
      })
    });
    // this.dataSource.data = this.clientes;
    // console.log(this.clientes[0]);
  }

  crearCliente()
  {
    this.router.navigate(['/clientes/crear']);
  }


}
