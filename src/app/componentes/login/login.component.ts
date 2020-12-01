import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  public registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginServicio: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion()
  {
    this.loginServicio.login(this.registerForm.value).then((response) => {
      console.log(response);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
