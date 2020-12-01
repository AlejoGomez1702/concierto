import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadioService } from './estadio.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService 
{
  public cedula: string = '';

  constructor(
    private firestore: AngularFirestore,
    private estadioServicio: EstadioService
  )
  { }

  agregarVenta(datos){
    const { asiento, dia } = datos;
    return this.firestore.collection('ventas').add({
      asiento,
      dia,
      creada_en: Date.now(),
      cedula: this.cedula
    });
  }

}
