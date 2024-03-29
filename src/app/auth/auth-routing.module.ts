import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path:'**',
    // component: ErrorPageComponent,
    redirectTo: '404'
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
