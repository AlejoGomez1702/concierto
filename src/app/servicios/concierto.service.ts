import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConciertoService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  obtenerConciertos()
  {
    return this.firestore.collection('conciertos').get();
  }

  editarConcierto(id, info)
  {
    return this.firestore.collection('conciertos').doc(id).set(info, {merge: true});
  }

}
