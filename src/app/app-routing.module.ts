import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ConciertoComponent } from './componentes/concierto/concierto.component';
import { CrearClientesComponent } from './componentes/crear-clientes/crear-clientes.component';
import { EstadioComponent } from './componentes/estadio/estadio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent},
  {path: '', component: EstadioComponent},
  {path: 'concierto', component: ConciertoComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/crear', component: CrearClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
