import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadioService 
{
  // Asientos del concierto.
  public asientos = [];

  constructor(
    private firestore: AngularFirestore
  ) 
  { }

  async iniciarNuevoConcierto()
  {

    // 20 asientos NORTE y SUR
    for (let i = 0; i < 20; i++) 
    {
      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 1000,
          vip: false,
          ubicacion: 'norte',
          indice: i 
        }
      );

      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 1000,
          vip: false,
          ubicacion: 'sur',
          indice: i   
        }
      );   
    }
    
    // 10 asientos ORIENTE Y OCCIDENTE
    for (let i = 0; i < 10; i++) 
    {
      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 1000,
          vip: true,
          ubicacion: 'oriente',
          indice: i   
        }
      );

      await this.firestore.collection('asientos').add({
          ocupado: 0,
          valor1: 1000,
          valor2: 1000,
          vip: true,
          ubicacion: 'occidente',
          indice: i   
        }
      );
    }
  }

  obtenerAsientos()
  {
    return this.firestore.collection('asientos').get();
  }

  handleResponse(res)
  {
    console.log(res);
  }


  actualizarAsiento(id,estado){
    return this.firestore.collection('asientos').doc(id).set({ocupado: estado}, {merge: true});
  }



}
