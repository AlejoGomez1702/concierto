import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/servicios/cliente.service';
import {map, startWith} from 'rxjs/operators';
import { VentaService } from 'src/app/servicios/venta.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface Cliente {
  cedula: string;
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
}

@Component({
  selector: 'app-dialogo-lista-usuarios',
  templateUrl: './dialogo-lista-usuarios.component.html',
  styleUrls: ['./dialogo-lista-usuarios.component.css']
})
export class DialogoListaUsuariosComponent implements OnInit 
{

  public clientes: Cliente[] = [];

  public cedulas: string[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  public cedula: string = '';

  constructor(
    private router: Router,
    private clienteServicio: ClienteService,
    private ventaServicio: VentaService,
    public dialogRef: MatDialogRef<DialogoListaUsuariosComponent>
  ) { 
    this.obtenerClientes();
  }

  ngOnInit(): void 
  {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  seleccionarCedula(cedula)
  {
    this.cedula = cedula;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cedulas.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  async obtenerClientes()
  {    
    await this.clienteServicio.obtenerClientes().subscribe((clientes) => {
      clientes.forEach((cliente) => {
        // console.log(<Asiento>asiento.data());
        this.clientes.push(<Cliente>cliente.data());
        this.cedulas.push((<Cliente>cliente.data()).cedula);
      })
    });
    console.log(this.clientes);
  }

  crearCliente()
  {
    this.router.navigate(['/clientes/crear']);
  }

  guardarCliente()
  {
    this.ventaServicio.cedula = this.cedula;
    this.dialogRef.close();
  }

}
