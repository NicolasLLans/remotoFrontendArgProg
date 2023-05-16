import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: '**', component: AppComponent},
  {path: '', component: AppComponent},  
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
