import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './componentes/barra-superior/barra-superior.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { EstadioService } from './servicios/estadio.service';
import { ConciertoService } from './servicios/concierto.service';
import { LoginService } from './servicios/login.service';
import { ClienteService } from './servicios/cliente.service';

// Modulo de ANGULAR MATERIAL.
import { MaterialModule } from './modulos/material/material.module';
// import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { EstadioComponent } from './componentes/estadio/estadio.component';
import { ConciertoComponent } from './componentes/concierto/concierto.component';
import { DialogoComponent } from './componentes/dialogo/dialogo.component';
import { DialogoListaUsuariosComponent } from './componentes/dialogo-lista-usuarios/dialogo-lista-usuarios.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { CrearClientesComponent } from './componentes/crear-clientes/crear-clientes.component';
 
@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    EstadioComponent,
    ConciertoComponent,
    DialogoComponent,
    DialogoListaUsuariosComponent,
    LoginComponent,
    RegistroComponent,
    ClientesComponent,
    CrearClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,    
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [EstadioService, ConciertoService, LoginService, ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
