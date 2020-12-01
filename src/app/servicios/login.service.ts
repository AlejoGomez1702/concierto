import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService 
{

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) 
  { }

  async registrarUsuario(form)
  {
    await this.afAuth.createUserWithEmailAndPassword(form.email, form.password)
    .then((credentials) => {
      this.crearUsuario(form, credentials);
      return true;
    });
  }

  crearUsuario(form, credentials)
  {
    this.db.collection('usuarios').doc(credentials.user.uid).set({
      uid: credentials.user.uid,
      correo: form.email,
      contrasena: form.password,   
    }).then(() => {
      this.router.navigate(['/login']);
      // console.log('Se creo en la base de datos el usuario');
      // console.log(form);
    }).catch((error) => {
      this.router.navigate(['/login']);
      console.log('NOOOO SE PUDO CREAR EN LA BASE DE DATOS');
    });
  }

  async login(data)
  {
    try 
    {
      const result = await this.afAuth.signInWithEmailAndPassword(data.email, data.password);
      return result;
    } catch (error) 
    {
      console.log(error);      
    }
  }

}
