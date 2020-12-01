import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private db: AngularFirestore,
  ) { }

  async registrarCliente(cliente)
  {
    return await this.db.collection('clientes').add(cliente);
  }

  obtenerClientes()
  {
    return this.db.collection('clientes').get();
  }

}
