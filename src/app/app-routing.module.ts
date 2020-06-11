import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: DeshboardComponent
  },
  {
    path: 'Dashboard',
    component: DeshboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
