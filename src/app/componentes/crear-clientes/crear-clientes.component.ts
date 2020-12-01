import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.css']
})
export class CrearClientesComponent implements OnInit 
{
  public clienteForm = new FormGroup({
    cedula: new FormControl(''),
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    celular: new FormControl(''),
    correo: new FormControl('')
  });

  constructor(
    private clienteServicio: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  crearCliente()
  {
    this.clienteServicio.registrarCliente(this.clienteForm.value).then((response) => {
      console.log(response);
      this.router.navigate(['/clientes']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
