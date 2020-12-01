import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit 
{
  public registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginServicio: LoginService
  ) 
  { }

  ngOnInit(): void {
  }

  registrarUsuario()
  {
    const form = this.registerForm.value;
    this.loginServicio.registrarUsuario(form);
  }

}
